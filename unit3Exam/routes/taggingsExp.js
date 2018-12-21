const express = require('express');
const router = express.Router();
const {
  getAllTaggings,
  getSingleTagging,
  getAllResearcherTaggings,
  getAllAnimalTaggings,
  addNewTagging,
} = require('../database/queries/taggings.js');

router.get('/', getAllTaggings);
router.get('/:id', getSingleTagging);
router.get('/researchers/:id', getAllResearcherTaggings);
router.get('/animals/:id', getAllAnimalTaggings);
router.post('/', addNewTagging);

module.exports = router;
