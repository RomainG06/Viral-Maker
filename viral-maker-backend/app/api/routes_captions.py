from fastapi import APIRouter
import openai
from app.core.config import OPENAI_API_KEY

openai.api_key = OPENAI_API_KEY

router = APIRouter()

@router.get("/generate-caption")
def generate_caption():
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": "Génère 3 captions Instagram sur le thème des sneakers"}],
        max_tokens=150
    )
    return {"captions": response.choices[0].message['content']}
