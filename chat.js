document.addEventListener('DOMContentLoaded', (event) => {
    const chatContainer = document.getElementById('chat-container');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-message');

    // Placeholder API key - replace with actual key from secure storage
    const API_KEY = 'YOUR_API_KEY_HERE';
    const API_URL = 'http://your-open-webui-instance.com/api/chat/completions';

    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            displayMessage('user', message);
            chatInput.value = ''; // Clear input after sending
            fetchChatResponse(message);
        }
    }

    function displayMessage(role, content) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = `${role === 'user' ? 'You:' : 'Bot:'} ${content}`;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to bottom
    }

    function fetchChatResponse(message) {
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "model": "your-model-name", // Specify the model name you're using
                "messages": [{"role": "user", "content": message}]
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.choices && data.choices[0].message) {
                displayMessage('assistant', data.choices[0].message.content);
            } else {
                console.error('Unexpected response format:', data);
                displayMessage('assistant', 'Error: Could not process response.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            displayMessage('assistant', 'Error: Unable to connect to the server.');
        });
    }
});
