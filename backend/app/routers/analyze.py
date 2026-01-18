from fastapi import APIRouter, Depends
from ..deps import telegram_user
from ..schemas import AnalyzeRequest, AnalyzeResponse
from ..services.analyzer import analyze_demo, analyze_full

router = APIRouter(prefix="/analyze", tags=["analyze"])

@router.post("", response_model=AnalyzeResponse)
async def analyze(
    body: AnalyzeRequest,
    user=Depends(telegram_user),
):
    is_paid = False  # позже из БД

    data = (
        analyze_full(body.platform, body.query)
        if is_paid
        else analyze_demo(body.platform, body.query)
    )

    return data