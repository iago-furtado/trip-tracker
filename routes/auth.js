// routes/auth.js
var express = require('express');
var router = express.Router();
// Import User model
const User = require('../models/user');
var passport = require('passport'); 



// GET handler for '/register'
router.get('/register', (req, res) => {
  res.render('auth/register', { title: 'Register' });
});

// GET handler for '/login'
router.get('/login', (req, res) => {
  const messages = req.session.messages || [];
  req.session.messages = [];
  res.render('auth/login', { title: 'Login', messages });
});

// POST handler for '/register'
router.post('/register', async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.render('auth/register', { title: 'Register', errorMessage: 'Passwords do not match' });
    }

    // Use User model to register a new User
    const newUser = await User.register(new User({ username }), password);

    // If registration is successful, log in the user
    req.login(newUser, (err) => {
      if (err) {
        console.error('Error during login after registration:', err);
        return res.status(500).send('Internal Server Error');
      }

      // Redirect to the desired page (e.g., /private/list)
      res.redirect('/auth/login');
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('Internal Server Error');
  }
});

// POST handler for '/login'
router.post('/login', passport.authenticate('local', {
  successRedirect: '/private/list',
  failureRedirect: '/auth/login',
  failureMessage: 'Invalid username or password.',
}));


// auth/logout route
router.get('/logout', (req, res, next) => {
  // Logout the user
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    // Redirect to the home page or any other desired page after logout
    res.redirect('/');
  });
});


module.exports = router;
