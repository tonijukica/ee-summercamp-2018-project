const models = require('../models');
const helper = require('./helpers');
const Promise = require('bluebird');

function get(req, res, next) {
  const query = {
    where: {
      userId: req.user.id
    },
    include: {
      model: models.userAnswer,
      attributes: ['id'],
      include: [{
        model: models.question,
        attributes: ['id', 'text']
      },
      {
        model: models.answer,
        attributes: ['id', 'text']
      }
      ]
    },
    order: [
      ['updated_at', 'DESC']
    ]
  };
  models.quizAttempt.findAll(query)
    .then(quizAttempts => res.jsend.success(quizAttempts))
    .catch(err => res.jsend.error(err));
}
function submit(req, res, next) {
  const questionsAnswers = req.body.questionsAnswers;
  helper.evaluate(questionsAnswers).then(evaluatedQuestionsAnswers => {
    const userScore = helper.calculate(evaluatedQuestionsAnswers);
    const userQuery = {
      by: userScore,
      where: {
        id: req.user.id
      }
    };
    const quizAttemptQuery = {
      userId: req.user.id,
      score: userScore
    };
    models.user.increment('totalScore', userQuery);
    models.quizAttempt.create(quizAttemptQuery)
      .then((quizAttempt) => {
        Promise.map(questionsAnswers, (userAnswer) => {
          return Promise.map(userAnswer.answerIds, (answerId) => {
            const promise = models.userAnswer.create({
              userId: req.user.id,
              questionId: userAnswer.questionId,
              answerId: answerId,
              quizAttemptId: quizAttempt.id
            });
            return promise;
          });
        })
          .then(res.jsend.success(userScore))
          .catch(err => res.jsend.error(err));
      });
  });
}

module.exports = {
  get,
  submit
};
