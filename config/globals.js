const configurations = {
    'db': process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/TripTrackerDB',
};

module.exports = configurations;