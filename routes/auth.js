// routes/auth.js
var express = require('express');
var router = express.Router();

// Login Page
router.get('/login', function(req, res, next) {
  res.render('auth/login', { title: 'Login' });
});

// Register Page
router.get('/register', function(req, res, next) {
  res.render('auth/register', { title: 'Register' });
});

module.exports = router;
