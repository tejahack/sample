# AI Chatbot Web Application using Flask
# This script creates a web-based interface for the AI assistant.

# --- 1. Installation of Required Libraries ---
# pip install Flask flask-socketio speechrecognition pyttsx3 pyaudio

from flask import Flask, render_template_string
from flask_socketio import SocketIO, emit
import re
import webbrowser
import datetime
import threading
import sys
import json
import os
import platform
import subprocess
import shutil
import time

KNOWLEDGE_BASE_FILE = "knowledge_base.json"

# --- 2. Flask App Setup ---
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

# --- 3. Knowledge Base and Core Functions ---
# (These are the same as the desktop version)

def load_knowledge_base():
    """Loads a structured knowledge base from a JSON file."""
    try:
        with open(KNOWLEDGE_BASE_FILE, 'r') as f:
            data = json.load(f)
            if 'websites' not in data: data['websites'] = {}
            if 'general' not in data: data['general'] = {}
            if 'apps' not in data: data['apps'] = {}
            return data
    except (FileNotFoundError, json.JSONDecodeError):
        return {"websites": {}, "general": {}, "apps": {}}

def save_knowledge_base(data):
    """Saves the knowledge base to a JSON file."""
    with open(KNOWLEDGE_BASE_FILE, 'w') as f:
        json.dump(data, f, indent=4)

# --- 4. Chatbot Core Logic Class ---
# This class contains all the chatbot's abilities, independent of any UI.

class ChatbotCore:
    def __init__(self):
        self.user_knowledge_base = load_knowledge_base()

    def handle_command(self, command):
        """The brain of the chatbot. It decides which function to call."""
        # ... (handle_command logic from the previous version)
        if "time" in command:
            return f"The current time is {datetime.datetime.now().strftime('%I:%M %p')}."
        elif "open website" in command:
            return self.open_website(command)
        else:
            return "I'm sorry, I don't understand that command in this web environment yet."

    def open_website(self, command):
        site_to_open = command.replace("open website", "").strip()
        # In a web app, we can't open a new tab directly from the server.
        # We'll send the URL back to the frontend to handle.
        if not site_to_open.startswith("http"):
            site_to_open = "https://" + site_to_open
        return f"OPEN_URL:{site_to_open}"

# --- 5. Flask Routes and SocketIO Events ---

chatbot_core = ChatbotCore()

@app.route('/')
def index():
    return render_template_string(open("index.html").read())

@socketio.on('connect')
def handle_connect():
    print('Client connected')
    emit('response', {'data': 'Hello! I am your web-based AI assistant. How can I help you?', 'sender': 'ai'})

@socketio.on('user_command')
def handle_user_command(json_data):
    command = json_data['data'].lower()
    print(f'Received command: {command}')
    
    response = chatbot_core.handle_command(command)
    
    emit('response', {'data': response, 'sender': 'ai'})

# --- HTML Template ---
# For simplicity, the HTML is included here. In a larger app, this would be a separate file.
html_template = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Assistant</title>
    <style>
        /* Basic styling for the web interface */
        body { font-family: 'Roboto', sans-serif; background-color: #131314; color: #EAEAEA; margin: 0; display: flex; }
        #sidebar { width: 200px; background-color: #1E1F20; padding: 20px; }
        #chat-container { flex-grow: 1; display: flex; flex-direction: column; padding: 20px; height: 100vh; box-sizing: border-box; }
        #chat-history { flex-grow: 1; overflow-y: auto; border: 1px solid #2c3e50; padding: 10px; background-color: #1E1F20; }
        #input-area { display: flex; margin-top: 10px; }
        #user-input { flex-grow: 1; padding: 10px; background-color: #2c3e50; border: none; color: #EAEAEA; }
        #send-button { padding: 10px 20px; background-color: #8AB4F8; border: none; color: #131314; cursor: pointer; }
        .user-message { color: #8AB4F8; font-weight: bold; }
        .ai-message { color: #EAEAEA; }
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
    <div id="sidebar">
        <h2>AI Assistant</h2>
    </div>
    <div id="chat-container">
        <div id="chat-history"></div>
        <div id="input-area">
            <input type="text" id="user-input" placeholder="Type your command...">
            <button id="send-button">Send</button>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.0.1/socket.io.js"></script>
    <script>
        const socket = io();
        const chatHistory = document.getElementById('chat-history');
        const userInput = document.getElementById('user-input');
        const sendButton = document.getElementById('send-button');

        socket.on('response', function(msg) {
            if (msg.data.startsWith('OPEN_URL:')) {
                const url = msg.data.split(':')[1];
                window.open(url, '_blank');
                addMessage('Opening new tab...', 'ai');
            } else {
                addMessage(msg.data, msg.sender);
            }
        });

        function addMessage(message, sender) {
            const p = document.createElement('p');
            p.innerHTML = `<span class="${sender}-message">${sender === 'ai' ? 'AI' : 'You'}:</span> ${message}`;
            chatHistory.appendChild(p);
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }

        function sendCommand() {
            const command = userInput.value;
            if (command.trim() !== '') {
                addMessage(command, 'user');
                socket.emit('user_command', {data: command});
                userInput.value = '';
            }
        }

        sendButton.addEventListener('click', sendCommand);
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendCommand();
            }
        });
    </script>
</body>
</html>
"""

# Create the index.html file
with open("index.html", "w") as f:
    f.write(html_template)

if __name__ == '__main__':
    print("Starting Flask server...")
    print("Open http://127.0.0.1:5000 in your web browser.")
    socketio.run(app, debug=True)
