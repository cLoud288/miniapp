from pydantic import BaseModel

class AnalyzeRequest(BaseModel):
    platform: str
    query: str

class AnalyzeResponse(BaseModel):
    demo: bool
    ads: int
    avg_price: int
    competition: str
    top_sellers: int | None = None
    saturation_index: float | None = None