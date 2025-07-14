from fastapi import APIRouter
from app.services.supabase_client import get_supabase

router = APIRouter()

@router.get("/")
def get_sports():
    supabase = get_supabase()
    response = supabase.table("sports").select("*").execute()
    print("Response from Supabase:", response)
    return response.data
