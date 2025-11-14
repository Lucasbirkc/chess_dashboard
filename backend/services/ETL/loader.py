# TODO Refactor
import re
from datetime import datetime
from apps.chess.models import Game, Player, Move
from django.db import transaction

class ChessComLoader():
    def __init__(self):
        pass

    def load_user_games_to_db(self, games: list, username):
        print(f"Load_user_games: {username}")

        stats = {
            'loaded': 0,
            'skipped': 0,
            'errors': 0
        }

        for i, game_data in enumerate(games):
            if i%50 == 0:
                print(stats)
            try:
                # Check if game already exists (by link)
                link = game_data['tags'].get('Link', '')
                if link and Game.objects.filter(link=link).exists():
                    stats['skipped'] += 1
                    continue
                
                # Use transaction to ensure all-or-nothing
                with transaction.atomic():
                    game = self._create_game(game_data, username)
                    self._create_moves(game, game_data['moves'])
                    stats['loaded'] += 1
                    
            except Exception as e:
                stats['errors'] += 1
                print(f"Error loading game: {e}")
                continue

        return stats

    def _create_game(self, game_data: dict, username: str):
        tags = game_data['tags']
        
        # Get or create players
        white_username = tags.get('White', 'Unknown')
        black_username = tags.get('Black', 'Unknown')
        
        white_player, _ = Player.objects.get_or_create(
            username=white_username,
            platform='chess.com'
        )
        black_player, _ = Player.objects.get_or_create(
            username=black_username,
            platform='chess.com'
        )
        
        # Parse date (format: "2016.12.27")
        date_str = tags.get('Date', '').replace('.', '-')
        try:
            date_played = datetime.strptime(date_str, '%Y-%m-%d').date()
        except:
            date_played = datetime.now().date()
        
        # Extract ratings
        white_rating = self._parse_rating(tags.get('WhiteElo'))
        black_rating = self._parse_rating(tags.get('BlackElo'))
        
        # Create game
        game = Game.objects.create(
            white_player=white_player,
            black_player=black_player,
            event=tags.get('Event', ''),
            site=tags.get('Site', ''),
            date_played=date_played,
            result=game_data['result'],
            white_rating=white_rating,
            black_rating=black_rating,
            time_control=tags.get('TimeControl', ''),
            opening_name=self._extract_opening_name(tags.get('ECOUrl', '')),
            eco_code=tags.get('ECO', ''),
            eco_url=tags.get('ECOUrl', ''),
            termination=tags.get('Termination', ''),
            total_moves=len(game_data['moves']),
            pgn_raw=self._reconstruct_pgn(game_data),
            link=tags.get('Link', '')
        )
        
        return game

    def _create_moves(self, game: Game, moves_data: list):
        """Create Move objects for a game"""
        move_objects = []
        prev_white_time = None
        prev_black_time = None
        
        for move_pair in moves_data:
            move_number = move_pair['move_number']
            
            # White's move
            if move_pair.get('white'):
                white_data = move_pair['white']
                clock_time = self._parse_clock_time(white_data.get('comment'))
                time_spent = None
                if prev_white_time and clock_time:
                    time_spent = prev_white_time - clock_time
                
                move_objects.append(Move(
                    game=game,
                    move_number=move_number,
                    color='white',
                    move_notation=white_data['move'],
                    clock_time_remaining=clock_time,
                    time_spent=time_spent
                ))
                prev_white_time = clock_time
            
            # Black's move
            if move_pair.get('black'):
                black_data = move_pair['black']
                clock_time = self._parse_clock_time(black_data.get('comment'))
                time_spent = None
                if prev_black_time and clock_time:
                    time_spent = prev_black_time - clock_time
                
                move_objects.append(Move(
                    game=game,
                    move_number=move_number,
                    color='black',
                    move_notation=black_data['move'],
                    clock_time_remaining=clock_time,
                    time_spent=time_spent
                ))
                prev_black_time = clock_time
        
        # Bulk create for performance
        Move.objects.bulk_create(move_objects)


    def _parse_clock_time(self, comment: str) -> int:
        """
        Parse clock time from comment string
        Examples: '{[%clk 0:03:00]}' -> 180 seconds
        """
        if not comment:
            return None
        
        match = re.search(r'\[%clk (\d+):(\d+):(\d+(?:\.\d+)?)\]', comment)
        if match:
            hours = int(match.group(1))
            minutes = int(match.group(2))
            seconds = float(match.group(3))
            return int(hours * 3600 + minutes * 60 + seconds)
        
        return None


    def _parse_rating(self, rating_str: str) -> int:
        """Parse rating string to integer"""
        try:
            return int(rating_str) if rating_str else None
        except (ValueError, TypeError):
            return None


    def _extract_opening_name(self, eco_url: str) -> str:
        """
        Extract opening name from ECO URL
        Example: 'https://www.chess.com/openings/Philidor-Defense-Nimzowitsch-Variation-4.dxe5-Nxe4'
        Returns: 'Philidor Defense Nimzowitsch Variation'
        """
        if not eco_url:
            return ''
        
        # Get last part after '/openings/'
        parts = eco_url.rstrip('/').split('/openings/')
        if len(parts) < 2:
            return ''
        
        # Replace hyphens with spaces, remove move notation parts
        opening = parts[-1].split('-')
        # Stop at first part that looks like a move (starts with digit or lowercase)
        clean_parts = []
        for part in opening:
            if part and (part[0].isdigit() or (part[0].islower() and len(part) < 4)):
                break
            clean_parts.append(part)
        
        return ' '.join(clean_parts)


    def _reconstruct_pgn(self, game_data: dict) -> str:
        """
        Reconstruct PGN string from parsed data
        (Simple version - just tags + movetext)
        """
        lines = []
        
        # Add tags
        for key, value in game_data['tags'].items():
            lines.append(f'[{key} "{value}"]')
        
        lines.append('')  # Blank line after tags
        
        # Add moves
        movetext_parts = []
        for move_pair in game_data['moves']:
            move_num = move_pair['move_number']
            
            if move_pair.get('white'):
                movetext_parts.append(f"{move_num}. {move_pair['white']['move']}")
            
            if move_pair.get('black'):
                movetext_parts.append(move_pair['black']['move'])
        
        # Add result
        movetext_parts.append(game_data['result'])
        
        lines.append(' '.join(movetext_parts))
        
        return '\n'.join(lines)