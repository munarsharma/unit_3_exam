const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const researchers = require('./routes/researchersExp.js');
const species = require('./routes/speciesExp.js');
const animals = require('./routes/animalsExp.js');
const habitats = require('./routes/habitatsExp.js');
const taggings = require('./routes/taggingsExp.js');
const sightings = require('./routes/sightingsExp.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/researchers', researchers);
app.use('/species', species);
app.use('/animals', animals);
app.use('/habitats', habitats);
app.use('/taggings', taggings);
app.use('/sightings', sightings);

app.get('*', (req, res) => {
  res.status(404).send('Error! Try different route!');
});

app.listen(3000, () => {
  console.log('You are tuned into port 3000!');
});
