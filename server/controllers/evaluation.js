
const helper = require('./helpers');
function grade(req, res, next) {
  const questionsAnswers = req.body.questionsAnswers;
  helper.evaluate(questionsAnswers)
    .then(evaluatedQuestionsAnswers => res.jsend.success(evaluatedQuestionsAnswers))
    .catch(err => res.jsend.error(err));
}
module.exports = {
  grade
};
