from fastapi import APIRouter, HTTPException, requests
from pydantic import BaseModel
from app.core.config import SUPABASE_KEY, SUPABASE_URL

router = APIRouter()

class RefreshRequest(BaseModel):
    refresh_token: str
    
@router.post("/refresh")
def refresh_token(refresh_token: str):
    response = requests.post(
        f"{SUPABASE_URL}/auth/v1/token?grant_type=refresh_token",
        headers={
            "apikey": SUPABASE_KEY,
            "Content-Type": "application/json"
        },
        json={"refresh_token": refresh_token}
    )

    if response.status_code != 200:
        print("Échec refresh Supabase:", response.text)
        raise HTTPException(status_code=401, detail="Refresh token invalide")

    data = response.json()
    return {
        "access_token": data["access_token"],
        "refresh_token": data["refresh_token"],
        "expires_in": data["expires_in"],
        "token_type": data["token_type"]
    }