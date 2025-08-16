from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from app.models.club_create import ClubCreate
from app.services.auth import get_current_user
from app.services.supabase_client import get_supabase
from uuid import uuid4
from slugify import slugify

router = APIRouter()

supabase = get_supabase()

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

@router.put("/clubs/{id}")
def update_club(id: str, updated_data: dict, user=Depends(get_current_user)):
    supabase = get_supabase()
    
    club = supabase.table("clubs").select("*").eq("id", id).single().execute()
    if not club.data:
        raise HTTPException(status_code=404, detail="Club introuvable")
    if club.data["user_id_owner"] != user["id"]:
        raise HTTPException(status_code=403, detail="Accès refusé")

    response = supabase.table("clubs").update(updated_data).eq("id", id).execute()
    return response.data

@router.delete("/{id}")
def delete_club(id: str, user=Depends(get_current_user)):
    print("DELETE route called with ID:", id)
    supabase = get_supabase()
    print("ID reçu pour suppression:", id)
    club = supabase.table("clubs").select("*").eq("id", id).single().execute()
    print("Résultat Supabase:", club)
    print("Club to delete:", club)
    if not club.data:
        raise HTTPException(status_code=404, detail="Club introuvable")
    if club.data["user_id_owner"] != user["id"]:
        raise HTTPException(status_code=403, detail="Accès refusé")

    logo_url = club.data.get("logo_url")
    if logo_url:
        from urllib.parse import urlparse
        parsed = urlparse(logo_url)
        path_parts = parsed.path.split('/')
        file_key = '/'.join(path_parts[3:])
        supabase.storage.from_("club-logos").remove([file_key])

    supabase.table("clubs").delete().eq("id", id).execute()
    return {"message": "Club supprimé avec succès"}

@router.post("/{club_id}/follow")
def follow_club(club_id: str, user=Depends(get_current_user)):
    existing = supabase.table("club_followers").select("*") \
        .eq("club_id", club_id).eq("user_id", user["id"]).execute()
    if existing.data:
        raise HTTPException(status_code=400, detail="Already following")
    supabase.table("club_followers").insert({"club_id": club_id, "user_id": user["id"]}).execute()
    return {"message": "Club followed"}

@router.post("/{club_id}/unfollow")
def unfollow_club(club_id: str, user=Depends(get_current_user)):
    supabase.table("club_followers")\
        .delete()\
        .eq("club_id", club_id)\
        .eq("user_id", user["id"])\
        .execute()
    return {"message": "Club unfollowed"}


@router.get("/{club_id}/followers")
def get_club_followers(club_id: str):
    result = supabase.table("club_followers")\
        .select("user_id")\
        .eq("club_id", club_id)\
        .execute()
    user_ids = [row["user_id"] for row in result.data]
    return {"count": len(user_ids), "followers": user_ids}

                                                                                                             