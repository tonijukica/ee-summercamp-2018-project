const models = require('../models');

function get(req, res, next) {
  const lessonIds = req.query.lessonIds.split(',');
  const query = {
    where: {
      [models.Sequelize.Op.or]: {
        lessonId: lessonIds
      }
    },
    include: [
      {
        model: models.answer,
        attributes: ['id', 'text', 'question_id']
      }
    ]
  };
  models.question.findAll(query)
    .then(questions => res.jsend.success(questions))
    .catch(err => res.jsend.error(err));
}

function getOne(req, res, next) {
  const query = {
    where: {
      id: req.params.id
    }
  };
  models.question.findOne(query)
    .then(question => res.jsend.success(question))
    .catch(err => res.jsend.error(err));
}
module.exports = {
  get,
  getOne
};
