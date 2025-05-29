from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from supabase import create_client
import os

security = HTTPBearer()

supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        user = supabase.auth.get_user(token)
        print("User from Supabase:", user)
        if not user:
            raise HTTPException(status_code=401, detail="Invalid token")
        print("User ID:", user.user.id)
        print("User Email:", user.user.email)
        return {
        "id": user.user.id,
        "email": user.user.email
    }
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    
