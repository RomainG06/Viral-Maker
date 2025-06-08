from fastapi import FastAPI
from app.api import routes_captions, routes_image, routes_credits, routes_payment, routes_users, routes_themes
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:4200",
    "http://127.0.0.1:4200",
]

# Configuration des CORS pour autoriser les requêtes depuis le front-end
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # ou ["*"] pour autoriser tout le monde (à éviter en prod)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello Roms"}

app.include_router(routes_captions.router, prefix="/generate-captions")
app.include_router(routes_image.router, prefix="/generate-image")
app.include_router(routes_credits.router, prefix="/credits")
app.include_router(routes_payment.router, prefix="/payment")
app.include_router(routes_users.router, prefix="/users")
app.include_router(routes_themes.router, prefix="/themes")
