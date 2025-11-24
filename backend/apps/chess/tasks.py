from celery import shared_task
import time
from .services.etl_service import run_chess_etl

@shared_task(bind=True)
def fetch_user_games_task(self, username):
    try:
        loaded_count = run_chess_etl(username)

        print(f"Task ID {self.request.id}: ETL completed successfully. Loaded {loaded_count} games.")
        return loaded_count
    except Exception as e:
        print(f"Task ID {self.request.id}: ETL failed. Retrying in 60s... Error: {e}")
        raise self.retry(e=e, countdown=60, max_retries=3)