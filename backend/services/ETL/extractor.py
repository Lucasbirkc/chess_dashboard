# TODO Refactor
import requests
class ChessComExtractor():
    def __init__(self):

        # Needed for API request
        self.header_key_1 = "User-Agent"
        self.header_value_1 = "chess-analytics-app/1.0"
        self._set_headers()

    def _set_headers(self):
        self.headers = {
            self.header_key_1: self.header_value_1
        }
        
    def extract_games(self, username):
        '''
        Get all PGN data for a user
        '''

        archives_url = self._get_archives_fetch_url(username)

        response = requests.get(archives_url, headers=self.headers)
        response.raise_for_status()
        archives_list = response.json()['archives']
        
        pgn_texts = self._get_pgn_texts(archives_list)

        return pgn_texts
    
    def _get_pgn_texts(self, archives_list):
        pgn_texts = []

        for archive_url in archives_list:
            parts = archive_url.rstrip('/').split('/')
            year, month = parts[-2], parts[-1]
            
            pgn_url = f"{archive_url}/pgn"
            print(f"Downloading {year}-{month} games...")
            
            pgn_response = requests.get(pgn_url, headers=self.headers)
            pgn_response.raise_for_status()
            
            pgn_texts.append({
                'year': year,
                'month': month,
                'pgn_text': pgn_response.text
            })
        
        return pgn_texts


    def _get_archives_fetch_url(self, username):
        '''
        Creates and returns url for fetching archives
        '''
        return f"https://api.chess.com/pub/player/{username}/games/archives"