const { db } = require("./connection.js");

const getAllTaggings = (req, res, next) => {
  db.any("SELECT * FROM taggings")
    .then(taggings => {
      res.status(200).json({
        status: "Success",
        taggings: taggings,
        message: "Got all taggings!"
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

const getSingleTagging = (req, res, next) => {
  const taggingID = parseInt(req.params.id);
  db.one("SELECT * FROM taggings WHERE id=$1", [taggingID])
    .then(tagging => {
      res.status(200).json({
        status: "Success",
        tagging: tagging,
        message: "Got selected tagging!"
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

const getAllResearcherTaggings = (req, res, next) => {
  const researcherID = parseInt(req.params.id);
  db.any("SELECT * FROM taggings WHERE researcher_id=$1", [researcherID])
    .then(taggings => {
      res.status(200).json({
        status: "success",
        taggings: taggings,
        message: "All taggings for this researcher"
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

const getAllAnimalTaggings = (req, res, next) => {
  const animalID = parseInt(req.params.id);
  db.any("SELECT * FROM taggings WHERE animal_id=$1", [animalID])
    .then(taggings => {
      res.status(200).json({
        status: "success",
        taggings: taggings,
        message: "All taggings for this animal"
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

const addNewTagging = (req, res, next) => {
  db.none(
    "INSERT INTO taggings(animal_id, researcher_id) VALUES(${animal_id}, ${researcher_id})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "Success!",
        message: "A new tagging has been added"
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
  getAllTaggings,
  getAllResearcherTaggings,
  getAllAnimalTaggings,
  getSingleTagging,
  addNewTagging
};
