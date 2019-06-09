const models = require('../models');

function get(req, res, next) {
  const query = {
    where: {
      quizAttemptId: req.params.id
    }
  };
  models.userAnswer.findAll(query)
    .then(userAnswers => res.jsend.success(userAnswers))
    .catch(err => res.jsend.error(err));
}

function submit(req, res, next) {
  const query = {
    userId: req.user.id,
    quizAttemptId: req.params.id,
    questionIdd: req.body.question,
    answerId: req.body.answer
  };
  models.userAnswer.create(query)
    .then(userAnswer => res.jsend.success(userAnswer))
    .catch(err => res.jsend.error(err));
}

module.exports = {
  get,
  submit
};
