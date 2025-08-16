from fastapi import APIRouter, HTTPException
from app.services.supabase_client import get_supabase

router = APIRouter()

@router.get("/")
def get_sports():
    supabase = get_supabase()
    response = supabase.table("sports").select("*").execute()
    print("Response from Supabase:", response)
    return response.data

@router.get("/{sport_id}")
def get_sport_name(sport_id: int):
    supabase = get_supabase()
    response = supabase.table("sports").select("name").eq("id", sport_id).single().execute()

    if response.data is None:
        raise HTTPException(status_code=404, detail="Sport non trouvé")

    return {"name": response.data["name"]}
