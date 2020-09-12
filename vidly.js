// managing list of genres
// endpoint for getting list of all genres
// create new genres, update and delete existing genres 
// /api/genres

const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [
    { id: 1, name: 'action'},
    { id: 2, name: 'adventure'}
];

app.get('/api/genres/', (req, res) => {
    res.send(genres)
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
});

app.post('/api/genres/', (req, res) => {
   const { error } = validateGenre(req.body);
   if(error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length+1,
        name: req.body.name
    };

    genres.push(genre);
    res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
    // Lookup the course
    // If not existing, return 404
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the given ID was not found');

    // Validate
    // If invalid, return 400, Bad Request    
    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Update Course
    // Return updated course    
    genre.name = req.body.name;
    res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
    // Lookup the course
    // If not existing, return 404
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the given ID was not found');

    // Delete
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    // for(let i = 0; i < genres.length; i++){
    //     genres[i].id--;
    // }
    res.send(genre);
});

function validateGenre(genre){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(genre);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`Listening on port ${port}...`)});