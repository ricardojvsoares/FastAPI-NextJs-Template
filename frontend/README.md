# Frontend

Next.js app for this template.

## Prerequisites

- Node 22+
- [pnpm](https://pnpm.io/)

## Local development

1. Copy the env file:

```bash
cp .env.example .env
```

`NEXT_PUBLIC_API_URL` defaults to `http://localhost:8000`.

2. Install dependencies and start the dev server:

```bash
pnpm install
pnpm dev
```

- App: http://localhost:3000
- Health page (calls the API): http://localhost:3000/health

### Backend required

For pages that call the API (e.g. `/health`), run the backend in another terminal. From the repo root:

```bash
cd backend
uv sync
uv run uvicorn src.main:app --reload
```

See [backend/README.md](../backend/README.md) for Postgres and Docker options.
