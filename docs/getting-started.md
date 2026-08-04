# Getting Started

## Prerequisites
- Docker
- (Optional, for running outside Docker) [uv](https://docs.astral.sh/uv/), Node 22+, pnpm

## Run everything
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
docker compose up --build
```
- API: http://localhost:8000/docs
- Web: http://localhost:3000

## Run a single service standalone
Each service has its own compose file for isolated work:
```bash
cd backend && docker compose up --build   # API + its own Postgres
cd frontend && docker compose up --build  # Next.js only
```