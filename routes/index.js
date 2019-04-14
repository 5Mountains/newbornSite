const express = require('express')
const router = express.Router()
const library = require('./library');


module.exports = function (app) {
  app.use(router);
  // use routes
  app.use('/', require('./root'));
  app.use('/api', require('./api'));
}