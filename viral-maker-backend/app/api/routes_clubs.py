from fastapi import APIRouter, HTTPException, Query
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

@router.get("/explore")
def explore_clubs(sport_id: int = None, city: str = None, limit: int = 20, offset: int = 0):
    query = supabase.table("clubs").select("*")

    if sport_id:
        query = query.eq("sport_id", sport_id)
    if city:
        query = query.ilike("city", f"%{city}%")

    response = query.limit(limit).offset(offset).execute()

    if not response.data:
        raise HTTPException(status_code=404, detail="Aucun club trouvé")

    return {"clubs": response.data}

@router.get("/user/{user_id}")
def get_clubs_by_user(user_id: str, limit: int = Query(10, ge=1), offset: int = Query(0, ge=0)):
    response = supabase.table("clubs").select("*").eq("user_id_owner", user_id).range(offset, offset + limit - 1).execute()

    if response.data is None:
        raise HTTPException(status_code=404, detail="Aucun club trouvé pour cet utilisateur")

    return {"clubs": response.data}

@router.get("/slug/{slug}")
def get_club_by_slug(slug: str):
    response = supabase.table("clubs").select("*").eq("slug", slug).single().execute()

    if not response.data:
        raise HTTPException(status_code=404, detail="Club introuvable")

    return {"club": response.data}

