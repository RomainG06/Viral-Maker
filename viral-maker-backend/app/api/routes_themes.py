from fastapi import APIRouter
from app.services.supabase_client import get_supabase

router = APIRouter()

@router.get("/")
def get_themes():
    supabase = get_supabase()
    response = supabase.table("themes").select("*").execute()
    print("Response from Supabase:", response)
    return response.data
