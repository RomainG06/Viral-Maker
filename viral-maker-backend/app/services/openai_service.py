import openai
from app.core import config

openai.api_key = config.OPENAI_API_KEY

def generate_captions():
    response = openai.ChatCompletion.create(
        model="gpt-4-turbo",
        messages=[{"role": "user", "content": "Génère 3 captions pour une marque de sneakers tendance"}],
        n=3
    )
    return [choice.message.content for choice in response.choices]