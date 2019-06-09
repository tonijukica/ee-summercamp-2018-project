const lessonsQuestions = require('./json_files/questions');
const models = require('../');
const Promise = require('bluebird');
function seed() {
  return Promise.map(lessonsQuestions, (lessonQuestion) => {
    const promise = models.course.find({
      where: {
        title: lessonQuestion.course}
    }).then((course) => {
      const promiseLesson = models.lesson.find({
        where: {
          title: lessonQuestion.lesson,
          courseId: course.id
        }
      }).then((lesson) => {
        const promiseQuestion = models.question.create({
          text: lessonQuestion.question,
          category: lessonQuestion.category,
          author: lessonQuestion.author,
          difficulty: lessonQuestion.difficulty,
          lessonId: lesson.id
        });
        return promiseQuestion;
      });
      return promiseLesson;
    });
    return promise;
  })
    .then(() => {
      console.log('seeded questions');
    });
}
module.exports = { seed };
