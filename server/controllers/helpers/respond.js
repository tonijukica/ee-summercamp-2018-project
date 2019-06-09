function respond(res, data) {
  res.json({
    status: 'success',
    data: data
  });
}
module.exports = respond;
