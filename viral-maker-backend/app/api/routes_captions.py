from fastapi import APIRouter, Depends
from openai import OpenAI
import openai
from pydantic import BaseModel
from app.core.config import OPENAI_API_KEY
from app.services.auth import get_current_user

openai.api_key = OPENAI_API_KEY

client = OpenAI()

router = APIRouter()

class CaptionRequest(BaseModel):
    theme: str

@router.post("/")
def generate_caption(request: CaptionRequest, user=Depends(get_current_user)):
    print(f"User {user.id} requested captions for theme: {request.theme}")
    # Caption personnalisée selon le thème passé
    response = client.responses.create(
        model="gpt-4.1",
        input=f"Génère 3 captions sur le thème : {request.theme}"
    )
    return response.output_text