# Backend

FastAPI API for this template.

## Prerequisites

- [uv](https://docs.astral.sh/uv/)
- Python 3.14+ (managed by uv)
- Docker (optional, for Postgres)

## Local development

1. Copy the env file and point Postgres at your host machine when not using Docker networking:

```bash
cp .env.example .env
```

For a local uvicorn process (API on the host), set `POSTGRES_HOST=localhost` in `.env`. Keep `POSTGRES_HOST=db` when the API runs inside Docker Compose.

2. Install dependencies:

```bash
uv sync
```

3. Start Postgres, run migrations, then the API with reload:

```bash
docker compose up db -d
uv run python -m alembic upgrade head
uv run uvicorn src.main:app --reload
```

- API: http://localhost:8000
- OpenAPI docs: http://localhost:8000/docs
- Health: http://localhost:8000/health

CORS allows `http://localhost:3000` so the Next.js frontend can call the API in the browser.

## Run with Docker (API + Postgres)

```bash
cp .env.example .env
docker compose up --build
```
