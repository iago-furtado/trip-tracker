// routes/private.js
var express = require('express');
var router = express.Router();

router.get('/create', (req, res, next) => {
  res.render('private/create', { title: 'Create Itinerary' });
});

// Itinerary Pages
router.get('/list', (req, res, next) => {
    res.render('private/list', { title: 'Itinerary List' });
  });

router.get('/edit', (req, res, next) => {
  // Implement logic to fetch itinerary details based on req.params.id
  res.render('private/edit', { title: 'Edit Itinerary', itinerary: {} });
});

// Weather Page
router.get('/weather', (req, res, next) => {
  res.render('private/weather', { title: 'Weather Forecast' });
});

module.exports = router;
