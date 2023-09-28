const express = require('express');
const fs = require('fs');
const router = express.Router();

// Function to read the chat messages from the text file
function readChatMessages() {
  try {
    const messages = fs.readFileSync('chat.txt', 'utf8');
    return messages;
  } catch (err) {
    console.error('Error reading chat messages:', err);
    return '';
  }
}

router.get('/', (req, res, next) => {
  const chatMessages = readChatMessages();

  res.send(`
    <h1>Chat</h1>
    <div>
      <pre>${chatMessages}</pre>
    </div>
    <form action="/" method="POST">
      <input type="text" name="username" placeholder="Your Username">
      <input type="text" name="message" placeholder="Type your message...">
      <button type="submit">Send</button>
    </form>
  `);
});

router.post('/', (req, res, next) => {
  // Retrieve the username from the request body
  const username = req.body.username || 'DefaultUser'; // Use a default username if none provided
  const message = req.body.message;

  // Append the message to the chat file with the username prefix
  fs.appendFile('chat.txt', `${username}: ${message}\n`, (err) => {
    if (err) {
      console.error('Error appending message to chat:', err);
    }
  });

  // Redirect back to the '/' route
  res.redirect('/');
});

module.exports = router;
