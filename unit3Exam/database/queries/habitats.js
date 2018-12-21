const { db } = require('./connection.js');

const getAllHabitats = (req, res, next) => {
  db.any('SELECT * FROM habitats')
    .then(habitats => {
      res.status(200).json({
        status: 'Success',
        habitats: habitats,
        message: 'Got all habitats',
      });
    })
    .catch(err => {
      console.log('error!', err);
      res.status(404).json({
        status: 'Error!',
        message: 'Something went wrong',
      });
      next();
    });
};

const getSingleHabitat = (req, res, next) => {
  const habitatID = parseInt(req.params.id);
  db.one('SELECT * FROM habitats WHERE id=$1', [habitatID])
    .then(habitat => {
      res.status(200).json({
        status: 'Success',
        habitat: habitat,
        message: 'Got selected habitat!',
      });
    })
    .catch(err => {
      console.log('error!', err);
      res.status(404).json({
        status: 'Error!',
        message: 'Something went wrong',
      });
      next();
    });
};

const addNewHabitat = (req, res, next) => {
  db.none('INSERT INTO habitats(category) VALUES(${category})', req.body)
    .then(() => {
      res.status(200).json({
        status: 'Success',
        message: 'A new habitat has been added',
      });
    })
    .catch(err => {
      console.log('error!', err);
      res.status(404).json({
        status: 'Error!',
        message: 'Something went wrong',
      });
      next();
    });
};

module.exports = { getAllHabitats, getSingleHabitat, addNewHabitat };
