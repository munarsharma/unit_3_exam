const express = require('express');
const router = express.Router();
const {
  getAllAnimals,
  getOneAnimal,
  addNewAnimal,
  editSingleAnimal,
  deleteSingleAnimal,
} = require('../database/queries/animals.js');

router.get('/', getAllAnimals);
router.get('/:id', getOneAnimal);
router.post('/', addNewAnimal);
router.patch('/:id', editSingleAnimal);
router.delete('/:id', deleteSingleAnimal);

module.exports = router;
