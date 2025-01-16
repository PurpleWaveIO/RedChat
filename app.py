from flask import Flask, render_template, request, jsonify, send_from_directory
import os
from dotenv import load_dotenv

app = Flask(__name__, static_folder='static')
load_dotenv()  # Load environment variables from .env

# Assuming your API key is stored in environment variable
API_KEY = os.getenv('OPEN_WEBUI_API_KEY')
API_URL = 'http://your-open-webui-instance.com/api/chat/completions'

@app.route('/')
def home():
    return render_template('chat.html')

@app.route('/chat', methods=['POST'])
def chat():
    message = request.json.get('message')
    if not message:
        return jsonify({'error': 'No message provided'}), 400

    try:
        import requests
        headers = {
            'Authorization': f'Bearer {API_KEY}',
            'Content-Type': 'application/json'
        }
        data = {
            "model": "your-model-name",  # Specify the model name you're using
            "messages": [{"role": "user", "content": message}]
        }
        response = requests.post(API_URL, headers=headers, json=data)
        response.raise_for_status()  # Will raise an HTTPError for bad responses
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

@app.route('/static/js/<path:filename>')
def serve_js(filename):
    return send_from_directory('static/js', filename)

if __name__ == '__main__':
    app.run(debug=True)
