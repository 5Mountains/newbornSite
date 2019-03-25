const express = require('express')
const router = express.Router()
const lib = require('./lib')

module.exports = function (app) {
  app.use(router);



  // use routes
  [
    ['/',        './root'],
    ['/chats',   './chats_'],

    ['/api',           './api/v1/_api'],
    ['/api',           './api/v1/files'],
    ['/api',           './api/v1/examples'],
    ['/api',           './api/v1/pay-sys'],
    ['/api/admin',     './api/v1/admin_dev'],
    ['/api/auth',      './api/v1/auth'],
    ['/api/danger',    './api/v1/danger'],
    ['/api/trainings', './api/v1/trainings'],
    ['/api/personal',  './api/v1/personal'],
    ['/api/chats',     './api/v1/chats'],

    ['/draft',         './_draft']
  ].map((path)=>{
    app.use(path[0], require(path[1]))
  });

    // use routes
    [
      '/pages',
      '/my',
      '/hot',
      '/programs'
    ].map((path)=>{
      app.use(path, require('.'+path))
    });
    
}

