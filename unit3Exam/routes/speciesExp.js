const express = require("express");
const router = express.Router();
const {
  getAllSpecies,
  getOneSpecie,
  addNewSpecie
} = require("../database/queries/species.js");

router.get("/", getAllSpecies);
router.get("/:id", getOneSpecie);
router.post("/", addNewSpecie);

module.exports = router;
