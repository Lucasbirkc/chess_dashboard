from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from apps.chess.models import Player
from django.http import JsonResponse
from .tasks import fetch_user_games_task

from .services.game_analysis import (
    get_win_rate,
    get_peak_rating,
    get_latest_rating,
    get_total_games_played,
    get_opening_stats,
    get_recent_games
)

class PlayerWinRateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        # Get user's primary user games
        player = get_object_or_404(
            Player, 
            user=request.user,
            is_primary=True
        )

        data = get_win_rate(player.username)
        return Response(data, status=status.HTTP_200_OK)

class PlayerPeakRatingView(APIView):
    def get(self, request):
        # Get user's primary user games
        player = get_object_or_404(
            Player, 
            user=request.user,
            is_primary=True
        )

        data = {'peak_rating': get_peak_rating(player.username)}
        return Response(data, status=status.HTTP_200_OK)

class PlayerLatestRatingView(APIView):
    def get(self, request):
        # Get user's primary user games
        player = get_object_or_404(
            Player, 
            user=request.user,
            is_primary=True
        )

        data = {'latest_rating': get_latest_rating(player.username)}
        return Response(data, status=status.HTTP_200_OK)

class PlayerTotalGamesView(APIView):
    def get(self, request):
        # Get user's primary user games
        player = get_object_or_404(
            Player, 
            user=request.user,
            is_primary=True
        )

        data = {'total_games': get_total_games_played(player.username)}
        return Response(data, status=status.HTTP_200_OK)

class PlayerOpeningStatsView(APIView):
    def get(self, request):
        # Get user's primary user games
        player = get_object_or_404(
            Player, 
            user=request.user,
            is_primary=True
        )
        min_rating = int(request.query_params.get('min_rating', 0))
        data = list(get_opening_stats(player.username, min_rating))
        return Response(data, status=status.HTTP_200_OK)
    
class PlayerOpeningPerformanceView(APIView):
    def get(self, request, username):
        min_rating = int(request.query_params.get('min_rating', 0))
        #data = list(get_opening_stats(username, min_rating))
        # return Response(data, status=status.HTTP_200_OK)
    
class PlayerAnalyticsOverview(APIView):
    def get(self, request):
        # Get user's primary user games
        player = get_object_or_404(
            Player, 
            user=request.user,
            is_primary=True
        )

        min_rating = int(request.query_params.get('min_rating', 0))

        data = {
            'win_rate': get_win_rate(player.username),
            'peak_rating': get_peak_rating(player.username),
            'latest_rating': get_latest_rating(player.username),
            'total_games': get_total_games_played(player.username),
            'openings': list(get_opening_stats(player.username, min_rating)),
        }
        return Response(data)
    
class PlayerRecentGames(APIView):
    def get(self, request):
        # Get user's primary user games
        player = get_object_or_404(
            Player, 
            user=request.user,
            is_primary=True
        )

        data = {'games': get_recent_games(player.username)}
        return Response(data, status=status.HTTP_200_OK)
    

class FetchGamesAPIView(APIView):
    def get(self, request):
        username = "lucasbirkc"
        
        if not username:
            return Response({"error": "Username is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Trigger the task asynchronously
        task = fetch_user_games_task.delay(username)
        
        return Response({
            "message": f"Game fetching initiated for {username}.",
            "task_id": task.id,
            "status": "PENDING"
        }, status=status.HTTP_202_ACCEPTED) 