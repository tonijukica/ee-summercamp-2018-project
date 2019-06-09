const coursesLessons = require('./json_files/lessons');
const models = require('../');
const Promise = require('bluebird');
function seed() {
  console.log('Importing lessons');
  return Promise.map(coursesLessons, (courseLesson) => {
    const promise = models.course.find({
      where: {
        title: courseLesson.course}
    }).then((course) => {
      const promiseLesson = models.lesson.create({
        title: courseLesson.lesson,
        courseId: course.id
      });
      return promiseLesson;
    });
    return promise;
  })
    .then(() => {
      console.log('seeded lessons');
    });
}
module.exports = { seed };
