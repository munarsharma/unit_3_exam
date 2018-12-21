const { db } = require('./connection.js');

const getAllReseachers = (req, res, next) => {
  db.any('SELECT * FROM researchers')
    .then(researchers => {
      res.status(200).json({
        status: 'success',
        researchers: researchers,
        message: 'Got all Researchers',
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

const getOneReseacher = (req, res, next) => {
  const researcherId = parseInt(req.params.id);
  db.one('SELECT * FROM researchers WHERE id=$1', [researcherId])
    .then(researcher => {
      res.status(200).json({
        status: 'success',
        researcher: researcher,
        message: 'Got Single Researcher',
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

const createNewReseacher = (req, res, next) => {
  db.none(
    'INSERT INTO researchers(name, job_title) VALUES (${name},${job_title})',
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: 'A new researcher has been added',
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

const editSingleReseacher = (req, res, next) => {
  db.none(
    'UPDATE researchers SET name = ${name}, job_title=${job_title} WHERE id=${id}',
    {
      name: req.body.name,
      job_title: req.body.job_title,
      id: parseInt(req.params.id),
    }
  )
    .then(() => {
      res.status(200).json({
        status: 'Success',
        message: 'Researcher info has been updated!',
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

const deleteSinleReseacher = (req, res, next) => {
  const researcherId = parseInt(req.params.id);
  db.none('DELETE FROM researchers WHERE id=$1', [researcherId])
    .then(() => {
      res.status(200).json({
        status: 'Success',
        message: 'A researcher has been removed',
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
  getAllReseachers,
  getOneReseacher,
  createNewReseacher,
  editSingleReseacher,
  deleteSinleReseacher,
};
