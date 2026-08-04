from fastapi import FastAPI

app = FastAPI(title="FastAPI-NextJs-Template")

@app.get("/health")
async def health():
    return {"status": "ok"}