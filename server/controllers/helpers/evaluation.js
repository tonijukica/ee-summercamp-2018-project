const models = require('../../models');
function evaluate(questionsAnswers) {
  const response = [];
  const promises = [];
  const questionAtt = ['id'];
  const paramsInclude = {
    model: models.answer,
    attributes: ['id', 'correct', 'correctIndex']
  };
  questionsAnswers.forEach(element => {
    const resQuestion = {
      questionId: '',
      correctAnswersIds: [],
      incorrectAnswersIds: [],
      missedAnswersIds: []
    };
    const promise = models.question.findOne({
      where: {
        id: element.questionId
      },
      attributes: questionAtt,
      include: paramsInclude
    }).then((question) => {
      resQuestion.questionId = question.id;
      if (element.answerIds.length !== 0) {
        element.answerIds.forEach((answerId, index) => {
          question.answers.forEach((answer) => {
            if (answerId === answer.id) {
              if (answer.correct) {
                resQuestion.correctAnswersIds.push(answer.id);
              } else {
                resQuestion.incorrectAnswersIds.push(answer.id);
              }
            } else {
              if (answer.correct && !element.answerIds.includes(answer.id) && !resQuestion.missedAnswersIds.includes(answer.id)) {
                resQuestion.missedAnswersIds.push(answer.id);
              }
            }
          });
        });
      } else {
        question.answers.forEach(answer => {
          if (answer.correct) {
            resQuestion.missedAnswersIds.push(answer.id);
          }
        });
      }
      response.push(resQuestion);
    });

    promises.push(promise);
  });
  return Promise.all(promises).then(() =>
    response
  );
}
module.exports = evaluate;
