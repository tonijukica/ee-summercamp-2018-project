const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const api = require('./controllers');
const auth = require('./auth');
const passportSetup = require('./config/passport-setup');
const session = require('express-session');
const passport = require('passport');
console.log(passportSetup);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});
app.use(session({
  secret: 'testsecret', // should be from a config file
  maxAge: 24 * 60 * 60 * 1000,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', auth.router);
app.use('/api', api);
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

app.listen(9000, () => {
  console.log('Server  listening on port 9000!');
});
