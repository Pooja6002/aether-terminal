from fastapi import FastAPI
from pydantic import BaseModel
import random

app = FastAPI(title="ML Intelligence Service")

class TextPayload(BaseModel):
    text: str

class EntityPayload(BaseModel):
    text: str

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "ML Service is running"}

@app.post("/analyze/sentiment")
def analyze_sentiment(payload: TextPayload):
    # Mock sentiment score between -1.0 and 1.0
    score = random.uniform(-1.0, 1.0)
    return {"sentiment_score": round(score, 2)}

@app.post("/analyze/entities")
def extract_entities(payload: EntityPayload):
    # Mock entity extraction
    mock_entities = ["Russia", "China", "Oil", "Tech", "Middle East"]
    extracted = random.choices(mock_entities, k=random.randint(1, 3))
    return {"entities": extracted}

@app.post("/predict/impact")
def predict_impact(event_severity: float, sentiment_intensity: float, market_sensitivity: float):
    # Mock Impact Score = event severity × sentiment intensity × market sensitivity × historical correlation
    historical_correlation = random.uniform(0.5, 1.5)
    impact_score = event_severity * abs(sentiment_intensity) * market_sensitivity * historical_correlation
    
    signal = 'HOLD'
    if impact_score > 0.7:
        signal = 'BUY' if sentiment_intensity > 0 else 'SELL'
        
    return {
        "impact_score": round(impact_score, 2),
        "predicted_volatility": round(random.uniform(0.1, 0.9), 2),
        "signal": signal,
        "confidence": round(random.uniform(0.6, 0.99), 2)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
