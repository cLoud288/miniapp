def analyze_demo(platform: str, query: str):
    return {
        "demo": True,
        "ads": 1240,
        "avg_price": 18500,
        "competition": "high",
    }

def analyze_full(platform: str, query: str):
    return {
        "demo": False,
        "ads": 1240,
        "avg_price": 18500,
        "competition": "high",
        "top_sellers": 12,
        "saturation_index": 0.67,
    }