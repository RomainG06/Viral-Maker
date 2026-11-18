from pydantic import BaseModel


class ClubCreate(BaseModel):
    name: str
    description: str
    sport_id: int
    city: str
    logo_url: str
    user_id_owner: str  # UUID string