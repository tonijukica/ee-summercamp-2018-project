function calculate(validatedQuestionsAnswers) {
  let score = 0;
  validatedQuestionsAnswers.forEach(questionAnswers => {
    if (questionAnswers.incorrectAnswersIds.length === 0 && questionAnswers.missedAnswersIds.length === 0) {
      score += 1;
    }
  });
  return score;
}
module.exports = calculate;
