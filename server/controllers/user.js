const models = require('../models');

function topScore(req, res, next) {
  const query = {
    order: [
      ['total_score', 'DESC']
    ],
    attributes: ['username', 'total_score']
  };
  models.user.findAll(query)
    .then(scores => res.jsend.success(scores))
    .catch(err => res.jsend.error(err));
}
function get(req, res, next) {
  res.send(req.user);
}

module.exports = {topScore, get};
