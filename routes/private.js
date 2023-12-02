// routes/private.js
var express = require('express');
var router = express.Router();

// Dashboard Page
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard' });
});

// Itinerary Pages
router.get('/itinerary/list', function(req, res, next) {
  res.render('itinerary/list', { title: 'Itinerary List' });
});

router.get('/itinerary/create', function(req, res, next) {
  res.render('itinerary/create', { title: 'Create Itinerary' });
});

router.get('/itinerary/edit/:id', function(req, res, next) {
  // Implement logic to fetch itinerary details based on req.params.id
  res.render('itinerary/edit', { title: 'Edit Itinerary', itinerary: {} });
});

// Weather Page
router.get('/weather', function(req, res, next) {
  res.render('weather', { title: 'Weather Forecast' });
});

module.exports = router;
