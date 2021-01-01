const express = require('express');
const router = express.Router();

const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Horror' },
    { id: 3, name: 'Romance' }
];

router.get('/', (req, res) => {
    res.send(genres)
});

router.get('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
});

router.post('/', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(genre);
    res.send(genre);
});

router.put('/:id', (req, res) => {
    // Lookup the course
    // If not existing, return 404
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found');

    // Validate
    // If invalid, return 400, Bad Request    
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Update Course
    // Return updated course    
    genre.name = req.body.name;
    res.send(genre);
});

router.delete('/:id', (req, res) => {
    // Lookup the course
    // If not existing, return 404
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found');

    // Delete
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    // for(let i = 0; i < genres.length; i++){
    //     genres[i].id--;
    // }
    res.send(genre);
});

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(genre);
}

module.exports = router;