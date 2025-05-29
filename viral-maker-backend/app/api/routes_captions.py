from fastapi import APIRouter, Depends, HTTPException
from openai import OpenAI
import openai
from pydantic import BaseModel
from app.services.supabase_client import get_supabase
from app.core.config import OPENAI_API_KEY
from app.services.auth import get_current_user

openai.api_key = OPENAI_API_KEY

client = OpenAI()
router = APIRouter()
supabase = get_supabase()

class CaptionRequest(BaseModel):
    theme: str

@router.post("/")
def generate_caption(request: CaptionRequest, user=Depends(get_current_user)):
    user_id = user["id"]


    credit_response = supabase.table("credits").select("*").eq("user_id", user_id).single().execute()
    if not credit_response.data or credit_response.data["credits_remaining"] <= 0:
        raise HTTPException(status_code=402, detail="Plus de crédits disponibles")
    response = client.responses.create(
        model="gpt-4.1",
        input=f"Génère 3 captions sur le thème : {request.theme}"
    )
    new_amount = credit_response.data["credits_remaining"] - 10
    supabase.table("credits").update({"credits_remaining": new_amount}).eq("user_id", user_id).execute()

    return response.output_text