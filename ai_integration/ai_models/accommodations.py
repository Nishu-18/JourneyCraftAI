import google.generativeai as genai
from flask import Blueprint, request, jsonify
from flask_cors import CORS

# Blueprint for handling insights requests and Enable CORS
hotel_bp = Blueprint('hotel', __name__)
CORS(hotel_bp, origins=["http://localhost:5173"])

genai.configure(api_key = 'AIzaSyB7Or0tWCjrzFer_951DxKRjHwAjRu1TF4')

# Configuration for the Gemini model
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "application/json",
}

# Initialize the Gemini model
model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
)

# Initial chat session with a prompt for Dubai hotel information.  This sets up the conversation context.
chat_session = model.start_chat(
  history=[
    {
      "role": "user",
      "parts": [
        "Top 6 hotel of Dubai (name, description, approx rating out of 5 and address) in JSON format.",
      ],
    },
    {
      "role": "model",
      "parts": [
        "```json\n{\n  \"hotels\": [\n    {\n      \"name\": \"Burj Al Arab Jumeirah\",\n      \"description\": \"An iconic sail-shaped luxury hotel offering unparalleled opulence, exquisite dining, and breathtaking views.\",\n      \"rating\": 4.8,\n      \"address\": \"Jumeirah, Dubai, United Arab Emirates\"\n    },\n    {\n      \"name\": \"Armani Hotel Dubai\",\n      \"description\": \"A sophisticated hotel located within the Burj Khalifa, offering stunning city views and luxurious amenities.\",\n      \"rating\": 4.7,\n      \"address\": \"Burj Khalifa, Downtown Dubai, Dubai, United Arab Emirates\"\n    },\n    {\n      \"name\": \"Bulgari Resort Dubai\",\n      \"description\": \"A luxurious resort on a private island, featuring stunning sea views, private beach access, and exceptional service.\",\n      \"rating\": 4.6,\n      \"address\": \"Bulgari Resort Dubai, Jumeira Bay Island, Dubai, United Arab Emirates\"\n    },\n    {\n      \"name\": \"One&Only The Palm\",\n      \"description\": \"A luxurious resort on Palm Jumeirah, offering private villas, stunning beach access, and a range of dining options.\",\n      \"rating\": 4.5,\n      \"address\": \"Palm Jumeirah, Dubai, United Arab Emirates\"\n    },\n    {\n      \"name\": \"Four Seasons Resort Dubai at Jumeirah Beach\",\n      \"description\": \"A beachfront resort with luxurious accommodations, exceptional dining, and a range of amenities.\",\n      \"rating\": 4.4,\n      \"address\": \"Jumeirah Beach Road, Dubai, United Arab Emirates\"\n    },\n    {\n      \"name\": \"Address Downtown\",\n      \"description\": \"A stylish hotel located in Downtown Dubai, offering stunning views of Burj Khalifa and the Dubai Fountain.\",\n      \"rating\": 4.3,\n      \"address\": \"Downtown Dubai, Dubai, United Arab Emirates\"\n    }\n  ]\n}\n```\n",
      ],
    },
  ]
)

# API endpoint to receive user requests and get hotel list
@hotel_bp.route('/recommendation', methods=['POST'])
def get_insights():
    data = request.data.decode('utf-8')
    response = chat_session.send_message(data)
    return (response.text)