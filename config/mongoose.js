const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://muruvel1910:sri19.10vel@murugavel.bpdg3or.mongodb.net/codeial_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB'));

db.once('open', () => {
    console.log('Connected to MongoDB successfully');
});

module.exports = db;