const express = require("express");
const router = express.Router();
const {
  getAllSightings,
  getAllSpeciesSightings,
  getAllResearcherSightings,
  getAllHabitatSightings,
  addNewSighting,
  deleteSingleSighting
} = require("../database/queries/sightings.js");

router.get("/", getAllSightings);
router.get("/species/:id", getAllSpeciesSightings);
router.get("/researchers/:id", getAllResearcherSightings);
router.get("/habitats/:id", getAllHabitatSightings);
router.post("/", addNewSighting);
router.delete("/:id", deleteSingleSighting);

module.exports = router;
