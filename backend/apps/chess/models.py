from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from apps.users.models import User

# Player Model
class Player(models.Model):
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='players',
        default=5
    )

    # Maybe username and platform should be paired together uniquely
    username = models.CharField(max_length=100)
    platform = models.CharField(max_length=50, default='chess.com')
    is_primary = models.BooleanField(default=False) # Default showing

    country = models.CharField(max_length=3, blank=True, null=True)  # ISO country code
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['username', 'platform']
        indexes = [
            models.Index(fields=['username', 'platform']),
            models.Index(fields=['user', 'is_primary']),
        ]

# Game Model
class Game(models.Model):
    # Game result choices
    RESULT_CHOICES = [
        ('1-0', 'White wins'),
        ('0-1', 'Black wins'),
        ('1/2-1/2', 'Draw'),
        ('*', 'Unknown/Ongoing'),
    ]

    # Players
    white_player = models.ForeignKey(
        Player, 
        on_delete=models.CASCADE, 
        related_name='games_as_white'
    )
    black_player = models.ForeignKey(
        Player, 
        on_delete=models.CASCADE, 
        related_name='games_as_black'
    )

    # Game metadata
    event = models.CharField(max_length=200, blank=True)
    site = models.URLField(max_length=300, blank=True)
    date_played = models.DateField()
    result = models.CharField(max_length=10, choices=RESULT_CHOICES)

    # Ratings at time of game
    white_rating = models.IntegerField(null=True, blank=True)
    black_rating = models.IntegerField(null=True, blank=True)

    # Game details
    time_control = models.CharField(max_length=50)
    opening_name = models.CharField(max_length=200, blank=True)
    eco_code = models.CharField(max_length=10, blank=True)
    eco_url = models.URLField(max_length=300, blank=True)
    termination = models.CharField(max_length=100, blank=True)

    # Total moves
    total_moves = models.IntegerField(default=0)

    # Raw PGN storage
    pgn_raw = models.TextField()

    # External link
    link = models.URLField(max_length=500, blank=True)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date_played', '-created_at']
        indexes = [
            models.Index(fields=['white_player', 'date_played']),
            models.Index(fields=['black_player', 'date_played']),
            models.Index(fields=['date_played']),
            models.Index(fields=['result']),
            models.Index(fields=['opening_name']),
        ]

# Move Model
class Move(models.Model):
    COLOR_CHOICES = [
        ('white', 'White'),
        ('black', 'Black'),
    ]

    game = models.ForeignKey(
        Game, 
        on_delete=models.CASCADE, 
        related_name='moves'
    )

    # Move identification
    move_number = models.IntegerField()
    color = models.CharField(max_length=5, choices=COLOR_CHOICES)
    move_notation = models.CharField(max_length=20)  # "Nf3", "e4", "O-O"
    
    # Time tracking (in seconds)
    clock_time_remaining = models.IntegerField(
        null=True, 
        blank=True,
        help_text="Seconds remaining on clock after this move"
    )

    time_spent = models.IntegerField(
        null=True, 
        blank=True,
        help_text="Seconds spent thinking about this move"
    )

    fen_before = models.CharField(max_length=100, blank=True)  # FEN before move
    fen_after = models.CharField(max_length=100, blank=True)   # FEN after move
    
    # Engine analysis (populated later, after running Stockfish)
    evaluation = models.FloatField(
        null=True, 
        blank=True,
        help_text="Centipawn evaluation (positive = white advantage)"
    )
    best_move = models.CharField(max_length=20, blank=True)

    # Move classification
    is_blunder = models.BooleanField(default=False)
    is_mistake = models.BooleanField(default=False)
    is_inaccuracy = models.BooleanField(default=False)
    is_brilliant = models.BooleanField(default=False)
    is_best = models.BooleanField(default=False)
    
    # Centipawn loss (how much worse this move was than best move)
    centipawn_loss = models.FloatField(null=True, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['game', 'move_number', 'color']
        unique_together = ['game', 'move_number', 'color']
        indexes = [
            models.Index(fields=['game', 'move_number']),
            models.Index(fields=['is_blunder']),
            models.Index(fields=['is_mistake']),
        ]

# Game Summary Model
class GameSummary(models.Model):
    game = models.OneToOneField(
        Game, 
        on_delete=models.CASCADE, 
        related_name='summary',
        primary_key=True
    )

    # Accuracy scores (0-100)
    accuracy_white = models.FloatField(
        null=True, 
        blank=True,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    accuracy_black = models.FloatField(
        null=True, 
        blank=True,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )

    # Average time per move (in seconds)
    avg_time_per_move_white = models.FloatField(null=True, blank=True)
    avg_time_per_move_black = models.FloatField(null=True, blank=True)

    # Move quality counts (per player)
    blunders_white = models.IntegerField(default=0)
    blunders_black = models.IntegerField(default=0)
    mistakes_white = models.IntegerField(default=0)
    mistakes_black = models.IntegerField(default=0)
    inaccuracies_white = models.IntegerField(default=0)
    inaccuracies_black = models.IntegerField(default=0)

    # Average centipawn loss
    avg_centipawn_loss_white = models.FloatField(null=True, blank=True)
    avg_centipawn_loss_black = models.FloatField(null=True, blank=True)
    
    # Game phases
    opening_moves = models.IntegerField(default=0)  # Usually first 10-15 moves
    middlegame_moves = models.IntegerField(default=0)
    endgame_moves = models.IntegerField(default=0)

    # Time trouble indicators
    white_in_time_trouble = models.BooleanField(default=False)  # < 30 seconds at any point
    black_in_time_trouble = models.BooleanField(default=False)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Opening(models.Model):
    player = models.ForeignKey(
        Player, 
        on_delete=models.CASCADE, 
        related_name='opening_stats'
    )

    opening_name = models.CharField(max_length=200)
    eco_code = models.CharField(max_length=10, blank=True)

    # Statistics
    games_played = models.IntegerField(default=0)
    wins = models.IntegerField(default=0)
    losses = models.IntegerField(default=0)
    draws = models.IntegerField(default=0)
    
    # Games as white/black
    games_as_white = models.IntegerField(default=0)
    games_as_black = models.IntegerField(default=0)

    # Performance metrics
    avg_accuracy = models.FloatField(null=True, blank=True)
    avg_centipawn_loss = models.FloatField(null=True, blank=True)
    avg_game_length = models.FloatField(null=True, blank=True)  # Average number of moves
    
    # Timestamps
    last_played = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['player', 'opening_name']
        indexes = [
            models.Index(fields=['player', 'opening_name']),
            models.Index(fields=['eco_code']),
        ]