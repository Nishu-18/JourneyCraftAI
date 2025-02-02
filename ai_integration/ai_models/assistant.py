import google.generativeai as genai
from flask import Blueprint, request, jsonify
from flask_cors import CORS

# Blueprint for handling insights requests and Enable CORS
assistant_bp = Blueprint('assistant', __name__)
CORS(assistant_bp, origins=["http://localhost:5173"])

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

# Initial chat session with user's sample query.  This sets up the conversation context.
chat_session = model.start_chat(
  history=[
    {
      "role": "user",
      "parts": [
        "Hi",
      ],
    },
    {
      "role": "model",
      "parts": [
        "Hi there! How can I help you today?\n",
      ],
    },
  ]
)

# API endpoint to receive user queries and get solutions
@assistant_bp.route('/bot', methods=['POST'])
def get_insights():
    data = request.data.decode('utf-8')
    response = chat_session.send_message(data)
    return (response.text)