from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .services.game_analysis import (
    get_win_rate,
    get_peak_rating,
    get_latest_rating,
    get_total_games_played,
    get_opening_stats,
)

class PlayerWinRateView(APIView):
    def get(self, request, username):
        data = get_win_rate(username)
        return Response(data, status=status.HTTP_200_OK)

class PlayerPeakRatingView(APIView):
    def get(self, request, username):
        data = {'peak_rating': get_peak_rating(username)}
        return Response(data, status=status.HTTP_200_OK)

class PlayerLatestRatingView(APIView):
    def get(self, request, username):
        data = {'latest_rating': get_latest_rating(username)}
        return Response(data, status=status.HTTP_200_OK)

class PlayerTotalGamesView(APIView):
    def get(self, request, username):
        data = {'total_games': get_total_games_played(username)}
        return Response(data, status=status.HTTP_200_OK)

class PlayerOpeningStatsView(APIView):
    def get(self, request, username):
        min_rating = int(request.query_params.get('min_rating', 0))
        data = list(get_opening_stats(username, min_rating))
        return Response(data, status=status.HTTP_200_OK)
    
class PlayerOpeningPerformanceView(APIView):
    def get(self, request, username):
        min_rating = int(request.query_params.get('min_rating', 0))
        #data = list(get_opening_stats(username, min_rating))
        # return Response(data, status=status.HTTP_200_OK)
    
class PlayerAnalyticsOverview(APIView):
    def get(self, request, username):
        min_rating = int(request.query_params.get('min_rating', 0))

        data = {
            'win_rate': get_win_rate(username),
            'peak_rating': get_peak_rating(username),
            'latest_rating': get_latest_rating(username),
            'total_games': get_total_games_played(username),
            'openings': list(get_opening_stats(username, min_rating)),
        }
        return Response(data)