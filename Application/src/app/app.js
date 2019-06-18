const express = require('express');
const session = require('express-session');
const passport = require('passport');
const compression = require('compression');

require('./auth/auth.config');
const errorMiddleware = require('./error/error.middleware');
const { expressLogger } = require('./common/logger');
const { clientCache, serverCache } = require('./common/cache');
const appRouter = require('./app.router');

const app = express();

app.use(clientCache(5));
app.use(serverCache(30));
app.use(expressLogger);
app.use(express.json());
app.use(express.static('./src/static'));
app.use(session({secret: 'topsecret', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(compression());
app.use(appRouter);
app.use(errorMiddleware);

module.exports = app;
