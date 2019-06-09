const models = require('../models');

function get(req, res, next) {
  const query = {
    where: {
      topicId: req.params.id
    }
  };
  models.course.findAll(query)
    .then(courses => res.jsend.success(courses))
    .catch(err => res.jsend.error(err));
}

module.exports = { get };
