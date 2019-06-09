const input = require('./json_files/input');
const lodashArr = require('lodash/array');
const models = require('../');
const rawTopics = input.map(element => element.topic);
const topics = lodashArr.uniq(rawTopics);
const Promise = require('bluebird');
function seed() {
  console.log('Importing topics');
  return Promise.map(topics, (topic) => {
    const promise = models.topic.create({
      title: topic
    });
    return promise;
  })
    .then(() => {
      console.log('seeded topics');
    });
}
module.exports = { seed };
