from fastapi import APIRouter
from openai import OpenAI
from app.core.config import OPENAI_API_KEY

router = APIRouter()

client = OpenAI(api_key=OPENAI_API_KEY)

@router.get("/generate-caption")
def generate_caption():
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "user", "content": "Génère 3 captions Instagram stylées pour des sneakers."}
        ],
        max_tokens=150
    )

    return {"captions": response.choices[0].message.content}

""" This one works but need credits """
@router.get("/test-gpt")
def test_gpt():
    response =  client.responses.create(
    model="gpt-4.1",
    input="Write a one-sentence bedtime story about a unicorn."
)
    print(response.output_text)

