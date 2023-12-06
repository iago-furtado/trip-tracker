// routes/private.js
var express = require('express');
var router = express.Router();
const Itinerary = require('../models/itinerary');
const axios = require('axios');

router.get('/create', (req, res, next) => {
    res.render('private/create', { title: 'Create Itinerary', user: req.user });
});

router.get('/list', async (req, res) => {
    try {
        // Fetch all itineraries from the database
        const itineraries = await Itinerary.find();

        // Render the list view and pass the fetched data to it
        res.render('private/list', { title: 'Itinerary List', itineraries, user: req.user });
    } catch (error) {
        console.error('Error fetching itineraries:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/edit/:_id', async (req, res, next) => {
    try {
        // Implement logic to fetch itinerary details based on req.params.id
        const itinerary = await Itinerary.findById(req.params._id);

        if (!itinerary) {
            // Handle case where itinerary is not found
            return res.status(404).render('error', { message: 'Itinerary not found', error: { status: 404 } });
        }

        // Render the edit itinerary page with fetched itinerary details
        res.render('private/edit', { title: 'Edit Itinerary', itinerary, user: req.user });
    } catch (error) {
        // Handle errors during fetching itinerary details for edit
        console.error('Error fetching itinerary details:', error);
        res.status(500).send('Internal Server Error');
    }
});


// POST handler for private/add >  when I press save button 
// Route to handle form submissions for creating a new itinerary
router.post('/create', async (req, res) => {
    try {
        // Extract form data
        const { title, destination, startDate, endDate, activities, notes } = req.body;

        // Create a new Itinerary object
        const newItinerary = new Itinerary({
            title,
            destination,
            startDate,
            endDate,
            activities,
            notes,
        });

        // Save to the database
        await newItinerary.save();

        // Redirect to the list of itineraries or a confirmation page
        res.redirect('/private/list');
    } catch (error) {
        console.error('Error saving itinerary:', error);
        res.status(500).send('Internal Server Error');
    }
});


// POST handler for private/edit/:id
router.post('/edit/:_id', async (req, res) => {
    try {
        const { title, destination, startDate, endDate, activities, notes } = req.body;

        // Update the existing Itinerary object
        const updatedItinerary = await Itinerary.findByIdAndUpdate(
            req.params._id,
            {
                title,
                destination,
                startDate,
                endDate,
                activities,
                notes,
            },
            { new: true } // Return the updated document
        );

        if (!updatedItinerary) {
            // Handle case where itinerary is not found
            return res.status(404).render('error', { message: 'Itinerary not found', error: { status: 404 } });
        }

        // Redirect to the list of itineraries or a confirmation page
        res.redirect('/private/list');
    } catch (error) {
        console.error('Error updating itinerary:', error);
        res.status(500).send('Internal Server Error');
    }
});

// delete
router.get('/delete/:_id', async (req, res) => {
    try {
        let itineraryId = req.params._id;

        // Use await to ensure the delete operation is completed before redirecting
        await Itinerary.findOneAndDelete({ _id: itineraryId });

        res.redirect("/private/list");
    } catch (error) {
        console.error('Error deleting itinerary:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Weather Page
router.get('/weather', async (req, res, next) => {
    try {
      const apiKey = '5a6ec4869e2b9d45947ebf5f3a8066fe';
      const city = req.query.city || 'Barrie'; // Use the query parameter or a default city
      const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Use metric units for Celsius
  
      const response = await axios.get(apiUrl);
      const weatherData = response.data;
  
      res.render('private/weather', {
        title: 'Weather Forecast',
        city: weatherData.name,
        temperature: weatherData.main.temp,
        weatherDescription: weatherData.weather[0].description,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;
