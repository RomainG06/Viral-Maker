from fastapi import APIRouter
from supabase import create_client
from app.core.config import SUPABASE_URL, SUPABASE_KEY

router = APIRouter()

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

@router.get("/credits/{user_id}")
def get_credits(user_id: str):
    response = supabase.from_("credits").select("remaining_credits").eq("user_id", user_id).single().execute()
    return response.data
