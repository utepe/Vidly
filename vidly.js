// managing list of genres
// endpoint for getting list of all genres
// create new genres, update and delete existing genres 
// /api/genres
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost:27017/vidly', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(error => console.error('Could not connect to MongoDB: ', error));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`Listening on port ${port}...`)});