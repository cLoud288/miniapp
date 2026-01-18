import hmac
import hashlib
from urllib.parse import parse_qsl
from .config import settings

def verify_init_data(init_data: str) -> dict:
    data = dict(parse_qsl(init_data, strict_parsing=True))
    hash_ = data.pop("hash", None)
    if not hash_:
        raise ValueError("Missing hash")

    secret = hashlib.sha256(settings.BOT_TOKEN.encode()).digest()
    check_string = "\n".join(f"{k}={v}" for k, v in sorted(data.items()))
    signature = hmac.new(secret, check_string.encode(), hashlib.sha256).hexdigest()

    if signature != hash_:
        raise ValueError("Invalid signature")

    return data