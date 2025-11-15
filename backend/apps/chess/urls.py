from django.urls import path
from . import views

urlpatterns = [
    path('players/win_rate/', views.PlayerWinRateView.as_view(), name='player-win-rate'),
    path('players/peak_rating/', views.PlayerPeakRatingView.as_view(), name='player-peak-rating'),
    path('players/latest_rating/', views.PlayerLatestRatingView.as_view(), name='player-latest-rating'),
    path('players/total_games/', views.PlayerTotalGamesView.as_view(), name='player-total-games'),
    path('players/openings/', views.PlayerOpeningStatsView.as_view(), name='player-opening-stats'),
    
    path('players/analytics/', views.PlayerAnalyticsOverview.as_view(), name='player-analytics'),
]