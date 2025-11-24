from services.ETL.extractor import  ChessComExtractor
from services.ETL.loader import  ChessComLoader
from services.ETL.parser import  ChessComParser

def run_chess_etl(username: str) -> int:
    """
    Runs the ETL pipeline for a specified Chess.com user.

    Args:
        username: The Chess.com username to fetch games for.
        
    Returns:
        The total number of games successfully loaded into the database.
    """
    loader = ChessComLoader()
    extractor = ChessComExtractor()
    parser = ChessComParser()

    print(f'Starting ETL pipeline for user: {username}')
    
    all_games = []

    print('[1/3] Extracting games from chess.com...')
    try:
        pgn_batches = extractor.extract_games(username)
        print(f'Retrieved {len(pgn_batches)} monthly archives')
    except Exception as e:
        print(f'ERROR extracting games for {username}: {e}')
        raise
        
    print('[2/3] Parsing PGN data...')
    try:
        for batch in pgn_batches:
            games = parser.parse_pgn_text(batch['pgn_text'])
            all_games.extend(games)
            print(f'Parsed {batch["year"]}-{batch["month"]}: {len(games)} games')
            
        print(f'Total games parsed: {len(all_games)}')
    except Exception as e:
        print(f'ERROR parsing games for {username}: {e}')
        raise

    print('[3/3] Loading games into database...')
    try:
        stats = loader.load_user_games_to_db(all_games, username)
        
        print(f'Loaded: {stats["loaded"]} games')
        if stats.get('skipped', 0) > 0:
            print(f'WARNING Skipped (duplicates): {stats["skipped"]} games')
        if stats.get('errors', 0) > 0:
            print(f'ERROR loading games: {stats["errors"]} games')
            
        return stats.get('loaded', 0)
        
    except Exception as e:
        print(f'ERROR loading games for {username}: {e}')
        raise