const models = require('../models');
function get(req, res, next) {
  const query = {
    where: {
      courseId: req.params.id
    }
  };
  models.lesson.findAll(query)
    .then(lessons => res.jsend.success(lessons))
    .catch(err => res.jsend.error(err));
}
module.exports = { get };
