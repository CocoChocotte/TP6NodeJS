const express = require('express');
const controller = require('./auth.controller');
const passport = require('passport');
const { isAuthenticatedMiddleware } = require('./auth.config');

const router = express.Router();

router
  .post('/login', passport.authenticate('json'), controller.login)
  .get('/logout', isAuthenticatedMiddleware, controller.logout);

module.exports = router;
