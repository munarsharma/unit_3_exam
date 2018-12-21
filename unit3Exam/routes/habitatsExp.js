const express = require("express");
const router = express.Router();
const {
  getAllHabitats,
  getSingleHabitat,
  addNewHabitat
} = require("../database/queries/habitats.js");

router.get("/", getAllHabitats);
router.get("/:id", getSingleHabitat);
router.post("/", addNewHabitat);

module.exports = router;
