from django.contrib import admin
from .models import Player, Game, GameSummary, Move, Opening

# Register your models here.
admin.site.register(Player)
admin.site.register(Game)
admin.site.register(GameSummary)
admin.site.register(Move)
admin.site.register(Opening)