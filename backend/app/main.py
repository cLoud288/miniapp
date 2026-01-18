from fastapi import FastAPI
from .routers import analyze, billing
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Niche Analyzer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze.router)
app.include_router(billing.router)

@app.get("/health")
async def health():
    return {"ok": True}