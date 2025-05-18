from fastapi import FastAPI
from app.api import routes_captions, routes_image, routes_credits, routes_payment

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello Roms"}

app.include_router(routes_captions.router, prefix="/generate-captions")
app.include_router(routes_image.router, prefix="/generate-image")
app.include_router(routes_credits.router, prefix="/credits")
app.include_router(routes_payment.router, prefix="/purchase-credits")