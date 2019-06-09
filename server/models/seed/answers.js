const questionsAnswers = require('./json_files/answers');
const models = require('../');
const Promise = require('bluebird');
function seed() {
  return Promise.map(questionsAnswers, (questionAnswer) => {
    const promise = models.question.find({
      where: {
        text: questionAnswer.question}
    }).then((question) => {
      const promiseAnswer = models.answer.create({
        text: questionAnswer.text,
        correct: questionAnswer.correct,
        correctIndex: questionAnswer.correctIndex,
        questionId: question.id
      });
      return promiseAnswer;
    });
    return promise;
  })
    .then(() => {
      console.log('seeded answers');
    });
}
module.exports = { seed };
