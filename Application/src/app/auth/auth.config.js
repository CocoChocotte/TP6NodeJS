const passport = require('passport');
const { Strategy: JsonStrategy } = require('passport-json');
const authService = require('./auth.repository');
const { AppError, AppErrorTypes } = require('../error/error');

passport.use(new JsonStrategy((username, password, done) => {
  authService.findByCredentials(username, password)
    .then(user => done(null, user))
    .catch(() => done(null, false));
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  authService.findById(userId)
    .then(user => done(null, user))
    .catch(() => done(null, false));
});

module.exports = {
  isAuthenticatedMiddleware: (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      next(new AppError(AppErrorTypes.NOT_AUTHENTICATED));
    }
  }
};
