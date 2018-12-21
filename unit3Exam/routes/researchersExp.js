const express = require("express");
const router = express.Router();
const {
  getAllReseachers,
  getOneReseacher,
  createNewReseacher,
  editSingleReseacher,
  deleteSinleReseacher
} = require("../database/queries/researchers.js");

router.get("/", getAllReseachers);
router.get("/:id", getOneReseacher);
router.post("/", createNewReseacher);
router.patch("/:id", editSingleReseacher);
router.delete("/:id", deleteSinleReseacher);

module.exports = router;
