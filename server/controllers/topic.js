const models = require('../models');
function get(req, res, next) {
  models.topic.findAll()
    .then(topics => res.jsend.success(topics))
    .catch(err => res.jsend.error(err));
}

module.exports = { get };
