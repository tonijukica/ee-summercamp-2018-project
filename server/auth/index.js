const express = require('express');
const router = express.Router();
const passport = require('passport');
require('dotenv').config();
const authUser = (req, res, next) => {
  if (!req.user) {
    res.status(401).send('unauthorized user');
  } else {
    next();
  }
};
const checkIsAuthenticated = (req, res, next) => {
  if (req.user) {
    res.redirect(process.env.REDIRECT_URL);
  } else {
    next();
  }
};
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(process.env.REDIRECT_URL);
});
router.get('/google', checkIsAuthenticated, passport.authenticate('google', {
  scope: ['profile', 'email']
}));
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect(process.env.REDIRECT_URL);
});
router.get('/facebook', checkIsAuthenticated, passport.authenticate('facebook', {
  scope: ['email']
}));
router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
  res.redirect(process.env.REDIRECT_URL);
});

module.exports = {
  router,
  authUser
};
