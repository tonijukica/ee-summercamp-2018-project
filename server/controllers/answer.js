const models = require('../models');

function get(req, res, next) {
  const query = {
    where: {
      questionId: req.params.id
    }
  };
  models.answer.findAll(query)
    .then(answers => res.jsend.success(answers))
    .catch(err => res.jsend.error(err));
}

function getOne(req, res, next) {
  const query = {
    where: {
      id: req.params.id
    }
  };
  models.answer.findOne(query)
    .then(answer => res.jsend.success(answer))
    .catch(err => res.jsend.error(err));
}

module.exports = {
  get,
  getOne
};
