var express = require('express');
var router = express.Router();
const Itinerary = require('../models/itinerary');


/* GET home page. */
router.get('/', async (req, res) => {
  try {
    // Fetch data from the database (replace this with your actual data retrieval logic)
    const itineraries = await Itinerary.find();

    // Render the home page template and pass the data
    res.render('index', { title: 'Trip Tracker', itineraries });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});



module.exports = router;
