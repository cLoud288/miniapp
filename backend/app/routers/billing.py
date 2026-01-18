from fastapi import APIRouter, Depends
from ..deps import telegram_user

router = APIRouter(prefix="/billing", tags=["billing"])

@router.post("/invoice")
async def create_invoice(user=Depends(telegram_user)):
    return {
        "invoice_url": "https://t.me/pay"
    }

@router.get("/subscription")
async def subscription_status(user=Depends(telegram_user)):
    return {
        "active": False
    }