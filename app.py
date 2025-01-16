from flask import Flask, render_template, request, jsonify, send_from_directory
import os
from dotenv import load_dotenv

app = Flask(__name__, static_folder='static')
load_dotenv()

API_KEY = os.getenv('OPEN_WEBUI_API_KEY')
API_URL = 'http://your-open-webui-instance.com/api/chat/completions'

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat')
def chat_page():
    return render_template('chat.html')

@app.route('/chat', methods=['POST'])
def chat():
    # ... (keep your previous chat function here)

@app.route('/static/js/<path:filename>')
def serve_js(filename):
    return send_from_directory('static/js', filename)

if __name__ == '__main__':
    app.run(debug=True)
