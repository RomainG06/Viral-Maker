from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.models.club_create import ClubCreate
from app.services.supabase_client import get_supabase
from uuid import uuid4
from slugify import slugify

router = APIRouter()

supabase = get_supabase()

# 📥 Route création de club
@router.post("")
def create_club(club: ClubCreate):
    club_id = str(uuid4())
    slug = slugify(club.name) + "-" + club_id[:8]
    data = {
        "id": club_id,
        "name": club.name,
        "description": club.description,
        "sport_id": club.sport_id,
        "city": club.city,
        "logo_url": club.logo_url,
        "user_id_owner": club.user_id_owner,
        "slug": slug
    }

    response = supabase.table("clubs").insert(data).execute()
    print("Response from Supabase:", response)

    if not response.data:
        raise HTTPException(status_code=400, detail="Erreur lors de la création du club")

    return {"message": "Club créé ✅", "club": response.data[0]}

@router.get("")
def get_all_clubs():
    response = supabase.table("clubs").select("*").execute()
    return {"clubs": response.data}


@router.get("/{user_id}")
def get_user_clubs(user_id: str):
    response = supabase.table("clubs").select("*").eq("user_id", user_id).execute()

    if response.data:
        raise HTTPException(status_code=400, detail="")

    return {"clubs": response.data}
