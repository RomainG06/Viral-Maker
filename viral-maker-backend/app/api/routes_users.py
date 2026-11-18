from fastapi import APIRouter
from app.services.supabase_client import get_supabase

router = APIRouter()

@router.get("/")
def get_users():
    supabase = get_supabase()
    response = supabase.table("users").select("*").execute()
    print("Response from Supabase:", response)
    return response.data
