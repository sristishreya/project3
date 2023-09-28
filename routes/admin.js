const express = require('express');
const router = express.Router();

router.get('/login', (req, res, next) => {
  res.send(`
    <form action="/login-user" method="POST">
      <input type="text" id="username" name="username" placeholder="Enter your username">
      <button type="submit">Submit</button>
    </form>
  `);
});

router.post('/login-user', (req, res, next) => {
  const username = req.body.username;
  if (username) {
    // Store the username in localStorage
    res.cookie('username', username);
  }
  res.redirect('/');
});

module.exports = router;
