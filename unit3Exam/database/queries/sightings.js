const { db } = require("./connection.js");

const getAllSightings = (req, res, next) => {
  db.any("SELECT * FROM sightings")
    .then(sightings => {
      res.status(200).json({
        status: "Success",
        sightings: sightings,
        message: "Got all sightings!"
      });
    })
    .catch(err => {
      console.log("error!", err);
      res.status(404).json({
        status: "Error!",
        message: "Something went wrong"
      });
      next();
    });
};

const getAllSpeciesSightings = (req, res, next) => {
  const speciesID = parseInt(req.params.id);
  db.any("SELECT * FROM sightings WHERE species_id=$1", [speciesID])
    .then(species => {
      res.status(200).json({
        status: "success",
        species: species,
        message: "All sightings for this species"
      });
    })
    .catch(err => {
      console.log("error!", err);
      res.status(404).json({
        status: "Error!",
        message: "Something went wrong"
      });
      next();
    });
};

const getAllResearcherSightings = (req, res, next) => {
  const researcherID = parseInt(req.params.id);
  db.any("SELECT * FROM sightings WHERE researcher_id=$1", [researcherID])
    .then(researcher => {
      res.status(200).json({
        status: "success",
        researcher: researcher,
        message: "All sightings for this researcher"
      });
    })
    .catch(err => {
      console.log("error!", err);
      res.status(404).json({
        status: "Error!",
        message: "Something went wrong"
      });
      next();
    });
};

const getAllHabitatSightings = (req, res, next) => {
  const habitatID = parseInt(req.params.id);
  db.any("SELECT * FROM sightings WHERE habitat_id=$1", [habitatID])
    .then(habitat => {
      res.status(200).json({
        status: "success",
        habitat: habitat,
        message: "All sightings for this habitat"
      });
    })
    .catch(err => {
      console.log("error!", err);
      res.status(404).json({
        status: "Error!",
        message: "Something went wrong"
      });
      next();
    });
};

const addNewSighting = (req, res, next) => {
  db.none(
    "INSERT INTO sightings(researcher_id, species_id, habitat_id) VALUES(${researcher_id}, ${species_id}, ${habitat_id})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "Success!",
        message: "A new sighting has been added"
      });
    })
    .catch(err => {
      console.log("error!", err);
      res.status(404).json({
        status: "Error!",
        message: "Something went wrong"
      });
      next();
    });
};

const deleteSingleSighting = (req, res, next) => {
  const sightingID = parseInt(req.params.id);
  db.none("DELETE FROM sightings WHERE id=$1", [sightingID])
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Selected sighting has been deleted"
      });
    })
    .catch(err => {
      console.log("error!", err);
      res.status(404).json({
        status: "Error!",
        message: "Something went wrong"
      });
      next();
    });
};

module.exports = {
  getAllSightings,
  getAllSpeciesSightings,
  getAllResearcherSightings,
  getAllHabitatSightings,
  addNewSighting,
  deleteSingleSighting
};
