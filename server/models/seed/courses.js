const topicsCourses = require('./json_files/courses');
const models = require('../');
const Promise = require('bluebird');
function seed() {
  return Promise.map(topicsCourses, (topicCourse) => {
    const promise = models.topic.find({
      where: {
        title: topicCourse.topic}
    }).then((topic) => {
      const promiseCourse = models.course.create({
        title: topicCourse.course,
        topicId: topic.id
      });
      return promiseCourse;
    });
    return promise;
  })
    .then(() => {
      console.log('seeded courses');
    });
}
module.exports = { seed };
