from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import random

app = FastAPI(title="AI Trust Finder - AI Microservice")

class SkillInput(BaseModel):
    skill: str

class DocumentInput(BaseModel):
    document_url: str

class MatchInput(BaseModel):
    userId: str

@app.post("/api/v1/analyze-skills")
async def analyze_skills(input_data: SkillInput):
    skill_lower = input_data.skill.lower().strip()
    
    standard_ontology = {
        "react.js": "React",
        "reactjs": "React",
        "ml": "Machine Learning",
        "deep learning": "Machine Learning",
        "node": "Node.js",
        "nodejs": "Node.js"
    }
    
    normalized = standard_ontology.get(skill_lower, input_data.skill.title())
    
    category = "Beginner"
    if len(normalized) % 2 == 0:
        category = "Intermediate"
    if len(normalized) > 10:
        category = "Advanced"

    return {
        "original": input_data.skill,
        "normalized_skill": normalized,
        "predicted_category": category,
        "confidence": round(random.uniform(0.7, 0.99), 2)
    }

@app.post("/api/v1/verify-document")
async def verify_document(input_data: DocumentInput):
    extracted_text = "CERTIFICATE OF COMPLETION... ISSUED BY COURSERA... DATE: 2023..."
    status = "Verified" if random.random() > 0.2 else "Suspicious"
    
    return {
        "status": status,
        "extracted_text": extracted_text,
        "confidence_score": round(random.uniform(0.6, 0.98), 2)
    }

@app.post("/api/v1/calculate-matches")
async def calculate_matches(input_data: MatchInput):
    return [
        {
            "user_id_matched": "mock_user_id_789",
            "matchScore": round(random.uniform(0.6, 0.95), 2),
            "type": "SkillExchange",
            "reason": "You need React, and they are offering React. They need Machine Learning, which you have.",
            "missing_skills": ["Node.js"]
        },
        {
            "user_id_matched": "mock_user_id_456",
            "matchScore": round(random.uniform(0.5, 0.75), 2),
            "type": "CareerPath",
            "reason": "Their career trajectory aligns with yours.",
             "missing_skills": ["AWS", "Docker"]
        }
    ]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
