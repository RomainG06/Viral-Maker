from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
import stripe
from app.services.supabase_client import get_supabase
from app.services.auth import get_current_user
import os

class PurchaseCreditsRequest(BaseModel):
    amount: int
    
router = APIRouter()
supabase = get_supabase()
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

@router.get("/")
def get_credits(user=Depends(get_current_user)):
    user_id = user["id"]
    response = supabase.table("credits").select("*").eq("user_id", user_id).single().execute()

    if response.data is None:
        raise HTTPException(status_code=404, detail="Aucun crédit trouvé pour cet utilisateur")

    return {"credits": response.data["credits_remaining"]}

@router.post("/purchase-credits/")
def purchase_credits(request: PurchaseCreditsRequest, user=Depends(get_current_user)):
    user_id = user["id"]

    credit_response = supabase.table("credits").select("*").eq("user_id", user_id).single().execute()
    if not credit_response.data:
        supabase.table("credits").insert({
            "user_id": user_id,
            "credits_remaining": request.amount
        }).execute()
    else:
        new_amount = credit_response.data["credits_remaining"] + request.amount
        supabase.table("credits").update({
            "credits_remaining": new_amount
        }).eq("user_id", user_id).execute()

    return {"message": f"{request.amount} crédits ajoutés ✅"}
