// managing list of genres
// endpoint for getting list of all genres
// create new genres, update and delete existing genres 
// /api/genres

const Joi = require('joi');
const genres = require('./routes/genres');
const home = require('./routes/home');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`Listening on port ${port}...`)});