const mongoose = require('mongoose');

mongoose.connect('url goes here');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB'));

db.once('open', () => {
    console.log('Connected to MongoDB successfully');
});

module.exports = db;
