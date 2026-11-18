# Viral Maker Backend - AI Coding Instructions

## Architecture Overview

This is a **FastAPI backend** for a sports club social media content generation platform. The app uses:
- **Supabase** for authentication, database (users, clubs, sports, credits, club_followers)
- **OpenAI API** for caption/image generation (GPT-4.1-mini with image_generation tool)
- **Stripe** for payment processing
- **Frontend**: Angular app at `http://localhost:4200`

## Project Structure

```
app/
├── main.py              # FastAPI app, CORS config, router registration
├── core/config.py       # Environment variables (OPENAI_API_KEY, SUPABASE_URL, etc.)
├── api/                 # Route modules (routes_*.py pattern)
├── services/            # External service integrations
│   ├── auth.py          # JWT auth via Supabase (get_current_user dependency)
│   ├── supabase_client.py  # Singleton Supabase client factory
│   └── openai_service.py   # OpenAI client wrapper
└── models/              # Pydantic models for request/response validation
```

## Critical Patterns

### 1. Router Registration Convention
All routes follow `routes_<resource>.py` naming in `app/api/`. Register in `main.py` with:
```python
app.include_router(routes_<resource>.router, prefix="/<resource>")
```

### 2. Authentication Pattern
Protected endpoints use `get_current_user` dependency from `app.services.auth`:
```python
from app.services.auth import get_current_user

@router.post("/endpoint")
def protected_route(user=Depends(get_current_user)):
    user_id = user["id"]  # Returns dict with 'id' and 'email'
```

### 3. Supabase Client Usage
**ALWAYS** call `get_supabase()` function (not singleton import) to get client:
```python
from app.services.supabase_client import get_supabase

supabase = get_supabase()
response = supabase.table("table_name").select("*").execute()
```

### 4. Credit System Pattern
AI generation endpoints (captions, images) follow this flow:
1. Verify user has credits via `credits` table lookup
2. Raise `HTTPException(status_code=402)` if insufficient
3. Perform OpenAI operation
4. Deduct credits (10 for captions, 20 for images) after success

Example from `routes_captions.py`:
```python
credit_response = supabase.table("credits").select("*").eq("user_id", user_id).single().execute()
if not credit_response.data or credit_response.data["credits_remaining"] <= 0:
    raise HTTPException(status_code=402, detail="Plus de crédits disponibles")
# ... perform operation ...
new_amount = credit_response.data["credits_remaining"] - 10
supabase.table("credits").update({"credits_remaining": new_amount}).eq("user_id", user_id).execute()
```

### 5. Club Management Patterns
- **Slug generation**: Use `slugify` + UUID prefix: `slugify(club.name) + "-" + club_id[:8]`
- **Ownership verification**: Check `user_id_owner` matches `user["id"]` before update/delete
- **Storage cleanup**: Delete logo from `club-logos` bucket on club deletion (see `routes_clubs.py` DELETE handler)

### 6. Error Messages
Use **French** error messages in `HTTPException(detail=...)`:
```python
raise HTTPException(status_code=404, detail="Aucun club trouvé")
```

## Development Workflow

### Running the Server
```powershell
# Activate virtual environment (Windows)
.\env\Scripts\Activate.ps1

# Start uvicorn server
uvicorn app.main:app --reload
```

### Environment Variables
Create `.env` file in project root with:
```
OPENAI_API_KEY=<key>
SUPABASE_URL=<url>
SUPABASE_KEY=<anon_key>
SUPABASE_JWT_SECRET=<secret>
STRIPE_SECRET_KEY=<key>
```

### Testing
- Use `pytest` (installed in requirements.txt)
- CORS allows `http://localhost:4200` and `http://127.0.0.1:4200` for frontend testing

## Key Files Reference

- **`app/api/routes_clubs.py`**: Most complex route with follow/unfollow, storage, pagination examples
- **`app/api/routes_captions.py`**: Credit system and OpenAI integration pattern
- **`app/services/auth.py`**: JWT token validation via Supabase
- **`app/main.py`**: FastAPI setup with `redirect_slashes=False` (important!)

## Common Tasks

### Adding a New Route
1. Create `app/api/routes_<resource>.py` with `router = APIRouter()`
2. Import in `app/main.py`
3. Add `app.include_router(routes_<resource>.router, prefix="/<resource>")`

### Adding Authenticated Endpoint
```python
from fastapi import Depends
from app.services.auth import get_current_user

@router.post("/endpoint")
def my_endpoint(user=Depends(get_current_user)):
    # user["id"] and user["email"] available
```

### Query Supabase with Filters
```python
# Single result
response = supabase.table("table").select("*").eq("id", id).single().execute()

# Multiple with filtering
response = supabase.table("clubs")\
    .select("*")\
    .eq("sport_id", sport_id)\
    .ilike("city", f"%{city}%")\
    .limit(limit)\
    .offset(offset)\
    .execute()
```

### OpenAI Client Pattern (New SDK)
The project uses **new OpenAI SDK** (`client.responses.create`):
```python
from openai import OpenAI
client = OpenAI()

response = client.responses.create(
    model="gpt-4.1-mini",
    input="prompt",
    tools=[{"type": "image_generation"}]  # For image generation
)
```
