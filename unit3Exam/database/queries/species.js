const { db } = require("./connection.js");

const getAllSpecies = (req, res, next) => {
  db.any("SELECT * FROM species")
    .then(species => {
      res.status(200).json({
        status: "Success",
        species: species,
        message: "Got all Species!"
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

const getOneSpecie = (req, res, next) => {
  const speciesID = parseInt(req.params.id);
  db.one("SELECT * FROM species WHERE id=$1", [speciesID])
    .then(specie => {
      res.status(200).json({
        status: "Success",
        specie: specie,
        message: "Got one Specie"
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

const addNewSpecie = (req, res, next) => {
  db.none(
    "INSERT INTO species(name, is_mammal) VALUES (${name}, ${is_mammal})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "Success",
        message: "A new specie has been added"
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

module.exports = { getAllSpecies, getOneSpecie, addNewSpecie };
