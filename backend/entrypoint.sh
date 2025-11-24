#!/bin/bash
# entrypoint.sh

while ! nc -z db 5432; do
  echo "Waiting for PostgreSQL..."
  sleep 0.5
done
echo "PostgreSQL started"

# Run database migrations
python manage.py migrate --noinput

# Run the main command (Gunicorn)
exec "$@"