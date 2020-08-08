var express = require('express');
var router = express.Router();
var path = require('path');
const mail = require('../modules/mail.js')
const fs = require('fs');

router.post('/admin-login', function(req, res){
    console.log(req.body);
    if (req.body.name == 'admin' && req.body.password == 'admin') {
        res.json({
            ok: 'true',
            token: 'zweastxrdycjmhubn'
          });
    } else {
        res.json({
            ok: 'false',
            message: 'name or password is not correct'
          });
        }
  });

function readFile(path) {
    // if not mistake and everything is ok - resolve, else - reject
    return new Promise((resolve, reject) => {
      // path - путь, направление для чтения директории
      fs.readFile(path, 'utf-8', (err, names) => {
        if (err) reject(err);
        else resolve(names);
      });
    });
  }

function writeFile(path, text) {
    // if not mistake and everything is ok - resolve, else - reject
    return new Promise((resolve, reject) => {
      // path - путь, направление для чтения директории
      fs.writeFile(path, text, (err, names) => {
        if (err) reject(err);
        else resolve(names);
      });
    });
  }

router.post('/add-gallery', async function(req, res){
  const newName = req.body.galleryName;
  let appJson = await readFile('./app/app.json');
  const appObj = JSON.parse(appJson);
  appObj.galleryNames.push(newName);
  const appJsonNew = JSON.stringify(appObj);
  let finish = await writeFile('./app/app.json', appJsonNew);
  console.log(finish);
});

module.exports = router;