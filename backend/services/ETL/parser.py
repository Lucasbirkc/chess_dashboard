# TODO Refactor

from enum import Enum
from dataclasses import dataclass

class ChessComParser():
    def __init__(self):
        pass

    def parse_games(self, pgn_files):
        parsed_games = []
        for pgn_file in pgn_files:
            pgn_text = pgn_file['pgn_text']
            games = self.parse_pgn_text(pgn_text)
            parsed_games.append(games)
        return parsed_games

    def parse_pgn_text(self, pgn_text: str) -> list:
        """
        Parse PGN text into list of game dictionaries
        
        Args:
            pgn_text: Raw PGN string from API
            
        Returns:
            List of parsed game dicts
        """
        games = []
        
        # Split by double newline (games are separated by blank lines)
        raw_games = pgn_text.strip().split('\n\n\n')
        
        for raw_game in raw_games:
            if not raw_game.strip():
                continue
                
            # Split tags from movetext
            lines = raw_game.strip().split('\n')
            tags = {}
            movetext = None
            
            for line in lines:
                line = line.strip()
                if line.startswith('['):
                    # Parse tag
                    tag_dict = self._parse_tag(line)
                    tags.update(tag_dict)
                elif line.startswith('1.'):
                    # This is the movetext
                    movetext = line
                    break
            
            if movetext:
                # Use your existing tokenizer and parser
                tokenizer = GameTokenizer(movetext)
                tokens = tokenizer._tokenize_game()
                token_iterator = TokenIterator(tokens)
                
                parser = GameParser()
                game_data = parser._parse_tokens(token_iterator)
                
                # Combine tags and moves
                game_data['tags'] = tags
                games.append(game_data)
        
        return games

    def _parse_tag(self, tag: str) -> dict:
        """Parse a single PGN tag line"""
        tag = tag[1:-1]  # Remove brackets
        split = tag.split('"')
        tag_type = split[0].strip()
        tag_content = split[1]
        return {tag_type: tag_content}


class LineType(Enum):
    TAG = "tag"
    GAME = "game"

class TokenType(Enum):
    COMMENT_TOKEN = "COMMENT"
    NUMBER_TOKEN = "MOVE_NUMBER"
    MOVE_TOKEN = "MOVE"
    RESULT_TOKEN = "RESULT"

@dataclass
class Token:
    type: TokenType
    value: str
    
    def __repr__(self):
        return f"Token({self.type.value}, '{self.value}')"

class TokenIterator:
    def __init__(self, tokens: list):
        self._tokens = tokens
        self._position = 0
        self._tokens_len = len(tokens)
    
    def peek(self, offset: int = 0) -> Token | None:
        pos = self._position + offset
        return self._tokens[pos] if pos < self._tokens_len else None

    def advance(self) -> Token | None:
        token = self.peek()
        self._position += 1
        return token

    def has_more(self) -> bool:
        return self._position < self._tokens_len

class GameParser():
    def __init__(self):
        self.game = {'moves' : [], 'result': None}

    def _is_move(self, token: str) -> bool:
        # TODO
        if True:
            return True
        return False

    def _is_comment(self, token: str) -> bool:
        '''
        TODO
        Current implementation, check if comments can have other formats
        '''
        return token[0] == "{" and token[-1] == "}"

    def _parse_game(self, game: str) -> dict:
        pass

    def _parse_tokens(self, token_iterator: TokenIterator) -> dict:
        '''
        Creates a game dict from the tokens list. White and Black moves for each movenumber with their respective comments, and a result
        
        {
            "moves": [
                {
                    "move_number": 1,
                    "white": {
                        "move": "e4",
                        "comment": "[%clk 0:10:00.0]"
                    },
                    "black": {
                        "move": "e5",
                        "comment": "[%clk 0:09:55.9]"
                    }
                },
            ],
            "result": "1-0"
        }
        
        '''
        self.game = {'moves' : [], 'result': None}

        while token_iterator.has_more():
            token = token_iterator.peek()

            if token.type == TokenType.RESULT_TOKEN:
                self.game['result'] = token.value
                break
            
            if token.type == TokenType.NUMBER_TOKEN and '...' not in token.value:
                move_number = int(token.value.rstrip('.'))
                token_iterator.advance() # Consume token

                move_entry = {
                    "move_number": move_number,
                    "white": None,
                    "black": None
                }

                # Get white's move
                if token_iterator.peek() and token_iterator.peek().type == TokenType.MOVE_TOKEN:
                    white_move = token_iterator.advance().value
                    white_comment = None
                    
                    # Check for white's comment
                    if token_iterator.peek() and token_iterator.peek().type == TokenType.COMMENT_TOKEN:
                        white_comment = token_iterator.advance().value
                    
                    move_entry["white"] = {
                        "move": white_move,
                        "comment": white_comment
                    }

                if token_iterator.peek() and token_iterator.peek().type == TokenType.NUMBER_TOKEN and '...' in token_iterator.peek().value:
                    token_iterator.advance() # Consume token

                    if token_iterator.peek() and token_iterator.peek().type == TokenType.MOVE_TOKEN:
                        black_move = token_iterator.advance().value
                        black_comment = None

                        if token_iterator.peek() and token_iterator.peek().type == TokenType.COMMENT_TOKEN:
                            black_comment = token_iterator.advance().value
                        
                        move_entry["black"] = {
                            "move": black_move,
                            "comment": black_comment
                        }
                
                self.game['moves'].append(move_entry)
            else:
                # Skip unknown tokens
                token_iterator.advance()
        
        return self.game

    def _is_white_move(move_token: str) -> bool:
        return "..." != move_token

    def _is_valid_move_notation(self, token: str) -> bool:
        '''
        Checks if the notation is valid. Does NOT check if the move is valid for the game position
        '''
        return True

class GameTokenizer():
    def __init__(self, game: str):
        self.game = game

    def _tokenize_game(self) -> list:
        '''
        Take in game string and return list with tokens --> move_number, move, comment, or result.
        Acts as a lexer for the game string
        '''

        move_text = self._preprocess_game_string()

        tokens = []
        i = 0

        while i < len(move_text):
            char = move_text[i]

            # Comment case
            if char == '{':
                comment = '{'
                i += 1
                left_brackets_count = 1
                right_brackets_count = 0
                while i < len(move_text) and left_brackets_count != right_brackets_count:
                    if move_text[i] == '}':
                        right_brackets_count += 1
                    elif move_text[i] == '{':
                        left_brackets_count += 1
                    comment += move_text[i]
                    i+=1
                tokens.append(Token(TokenType.COMMENT_TOKEN, comment))
                continue
            
            # Move number
            if char.isdigit():
                # End of game
                if move_text[i+1] in ['-', '/']:
                    tokens.append(Token(TokenType.RESULT_TOKEN, move_text[i:].strip()))
                    break

                number = ''

                while i < len(move_text) and move_text[i].isdigit():
                    number += move_text[i]
                    i += 1
                
                # Add trailing dots
                while i < len(move_text) and move_text[i] == '.':
                    number += move_text[i]
                    i += 1
                
                tokens.append(Token(TokenType.NUMBER_TOKEN, number))
                continue
            
            # Move token
            if char != ' ':
                move = ""
                while i < len(move_text) and move_text[i] != ' ':
                    move += move_text[i]
                    i += 1
                tokens.append(Token(TokenType.MOVE_TOKEN, move))
                continue

            i += 1
        
        return tokens

    def _preprocess_game_string(self) -> str:
        '''
        TODO
        For future use. I am unsure if other websites add spaces or end of line chars to PGN files. Could become useful for cleaning strings before parsing and tokenizing
        '''
        return self.game