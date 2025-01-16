document.addEventListener('DOMContentLoaded', (event) => {
    const chatContainer = document.getElementById('chat-container');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-message');

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
            chatInput.value = '';
            fetchChatResponse(message);
        }
    }

    function displayMessage(role, content) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = `${role === 'user' ? 'You:' : 'Bot:'} ${content}`;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function fetchChatResponse(message) {
        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            if (data.choices && data.choices[0].message) {
                displayMessage('assistant', data.choices[0].message.content);
            } else {
                console.error('Unexpected response format:', data);
                displayMessage('assistant', 'Error: Could not process response.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            displayMessage('assistant', 'Error: ' + error.message);
        });
    }
});
