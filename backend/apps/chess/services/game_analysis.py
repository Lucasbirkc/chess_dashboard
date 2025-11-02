from chess.models import Game
from django.db.models import Q, Avg, Count, Sum, Max

def get_win_rate(username):
    user_games = _get_user_games(username)
    total = user_games.count()

    if total == 0:
        return {'win_rate': 0, 'total_games': 0}
    
    # Count wins
    wins_as_white = user_games.filter(
        white_player__username=username,
        result='1-0'
    ).count()
    
    wins_as_black = user_games.filter(
        black_player__username=username,
        result='0-1'
    ).count()
    
    total_wins = wins_as_white + wins_as_black
    win_rate = (total_wins / total) * 100
    
    return {
        'win_rate': round(win_rate, 1),
        'total_games': total,
        'wins': total_wins
    }

def get_peak_rating(username):
    user_games = _get_user_games(username)
    
    # Count wins
    peak_white = user_games.filter(
        white_player__username=username
    ).aggregate(max_rating=Max('white_rating'))['max_rating'] or 0
    
    peak_black = user_games.filter(
        black_player__username=username
    ).aggregate(max_rating=Max('black_rating'))['max_rating'] or 0

    return max(peak_white, peak_black)

def get_latest_rating(username):
    latest_game = _get_user_latest_game(username)
    if not latest_game:
        return 0

    if latest_game.white_player.username == username:
        return latest_game.white_rating
    
    if latest_game.black_player.username == username:
        return latest_game.black_rating or 0
    
    return 0

def get_average_accuracy(username):
    pass

def get_total_games_played(username):
    return _get_user_games(username).count()

def get_opening_stats(username, min_rating=0):
    user_games = _get_user_games(username).filter(
        Q(white_rating__gte=min_rating) | Q(black_rating__gte=min_rating)
    )
    # Count games by openins
    return user_games.values('opening_name').annotate(
        count=Count('id')
    ).order_by('-count')

def get_time_management_stats(username):
    pass

def get_performance_by_rating(username):
    pass

def get_recent_trends(username, days=30):
    pass

def _get_user_games(username):
    return Game.objects.filter(
        Q(white_player__username=username) |
        Q(black_player__username=username)
    )

def _get_user_latest_game(username):
    return _get_user_games(username).order_by('-date_played').first()