from fastapi import Header, HTTPException
from .security import verify_init_data

async def telegram_user(x_init_data: str = Header(...)):
    try:
        return verify_init_data(x_init_data)
    except Exception:
        raise HTTPException(status_code=401, detail="Unauthorized")