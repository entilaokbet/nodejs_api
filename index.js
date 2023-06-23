const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const sports = [
    { id: 1, name: 'sports1' },
    { id: 2, name: 'sports2' },
    { id: 3, name: 'sports3' },
]
app.get('/', (req, res) => {
    res.send('okbet');
});

app.get('/api/sports', (req, res) => {
    res.send(sports);
});

// Create
app.post('/api/sports', (req, res) => {
    // const schema = {
    //     name: Joi.string().min(3).required()
    // };

    // const result = Joi.validate(req.body, schema);

    // if (result.error) {
    //     // 400 Bad Request
    //     res.status(400).send(result.error.details[0].message);
    //     return;
    // }

    // New Validate with functions validateSport()
    const result = validateSport(req.body); // result.error
    if (result.error) {
        // 400 Bad Request
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const sport = {
        id: sports.length + 1,
        name: req.body.name,
    };
    sports.push(sport);
    res.send(sport);
});

// Updated
app.put('/api/sports/:id', (req, res) => {
    // Lookup the sports first
    const sport = sports.find(c => c.id === parseInt(req.params.id));
    if (!sport) res.status(404).send('The sports with the given ID was not found.');
    res.send(sport);

    // validate
    // if invalid return 400 - Bad request
    // const result = validateSport(req.body);
    const result = validateSport(req.body); // result.error
    if (result.error) {
        // 400 Bad Request
        res.status(400).send(result.error.details[0].message);
        return;
    }

    // update sport
    // return updated sport
    sport.name = req.body.name;
    res.send(sport);

});

function validateSport(sport) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(sport, schema);
}

app.delete('/api/sports/:id', (req, res) => {
    // Look up for the sport
    // Not existing return 404
    const sport = sports.find(c => c.id === parseInt(req.params.id));
    if (!sport) res.status(404).send('The sports with the given ID was not found.');

    // Delete
    const index = sports.indexOf(sport);
    sports.splice(index, 1);

    res.send(sport);

});

app.get('/api/sports/:id', (req, res) => {
    const sport = sports.find(c => c.id === parseInt(req.params.id));
    if (!sport) res.status(404).send('The sports with the given ID was not found.');
    res.send(sport);
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));