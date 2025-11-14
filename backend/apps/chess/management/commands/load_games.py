from django.core.management import BaseCommand
from services.ETL.loader import ChessComLoader
from services.ETL.extractor import ChessComExtractor
from services.ETL.parser import ChessComParser

class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument('username', type=str, help='Chess.com username')

    def handle(self, *args, **options):
        loader = ChessComLoader()
        extractor = ChessComExtractor()
        parser = ChessComParser()
        username = options['username']
        self.stdout.write(self.style.WARNING(f'Starting ETL pipeline for user: {username}'))

        self.stdout.write('\n[1/3] Extracting games from chess.com...')
        try:
            pgn_batches = extractor.extract_games(username)
            self.stdout.write(self.style.SUCCESS(f'  ✓ Retrieved {len(pgn_batches)} monthly archives'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'  ✗ Error extracting games: {e}'))
            return
        
        self.stdout.write('\n[2/3] Parsing PGN data...')
        all_games = []
        try:
            for i, batch in enumerate(pgn_batches, 1):
                games = parser.parse_pgn_text(batch['pgn_text'])
                all_games.extend(games)
                self.stdout.write(f'  • Parsed {batch["year"]}-{batch["month"]}: {len(games)} games')
            
            self.stdout.write(self.style.SUCCESS(f'  ✓ Total games parsed: {len(all_games)}'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'  ✗ Error parsing games: {e}'))
            return

        self.stdout.write('\n[3/3] Loading games into database...')
        try:
            stats = loader.load_user_games_to_db(all_games, username)
            
            self.stdout.write(self.style.SUCCESS(f'  ✓ Loaded: {stats["loaded"]} games'))
            if stats['skipped'] > 0:
                self.stdout.write(self.style.WARNING(f'  ⊘ Skipped (duplicates): {stats["skipped"]} games'))
            if stats['errors'] > 0:
                self.stdout.write(self.style.ERROR(f'  ✗ Errors: {stats["errors"]} games'))
            
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'  ✗ Error loading games: {e}'))
            return
