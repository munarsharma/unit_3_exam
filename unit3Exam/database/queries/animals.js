const { db } = require('./connection.js');

const getAllAnimals = (req, res, next) => {
  db.any('SELECT * FROM animals')
    .then(animals => {
      res.status(200).json({
        status: 'success',
        animals: animals,
        message: 'Got all Animals',
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

const getOneAnimal = (req, res, next) => {
  const animalID = parseInt(req.params.id);
  db.one('SELECT * FROM animals WHERE id=$1', [animalID])
    .then(animal => {
      res.status(200).json({
        status: 'success',
        animal: animal,
        message: 'Got one Animal',
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

const addNewAnimal = (req, res, next) => {
  db.none(
    'INSERT INTO animals(species_id, nickname) VALUES (${species_id}, ${nickname})',
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: 'A new animal has been added!',
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

const editSingleAnimal = (req, res, next) => {
  db.none(
    'UPDATE animals SET species_id= ${species_id}, nickname=${nickname} WHERE id=${id}',
    {
      species_id: parseInt(req.body.species_id),
      nickname: req.body.nickname,
      id: parseInt(req.params.id),
    }
  )
    .then(() => {
      res.status(200).json({
        status: 'Success',
        message: 'Animal info has been updated!',
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

const deleteSingleAnimal = (req, res, next) => {
  const animalID = parseInt(req.params.id);
  db.none('DELETE FROM animals WHERE id=$1', [animalID])
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: 'Selected animal has been deleted',
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

module.exports = {
  getAllAnimals,
  getOneAnimal,
  addNewAnimal,
  editSingleAnimal,
  deleteSingleAnimal,
};
