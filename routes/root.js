var express = require('express');
var router = express.Router();
var path = require('path');
const mail = require('../modules/mail.js');
const fs = require('fs');

let indexPrewPhotos = {};
getPrewPhotos('novorozhdennye').then((result)=>{
  indexPrewPhotos.novorozhdennye = result,
  result.length = 10;
})

getPrewPhotos('mladentsy').then((result)=>{
  indexPrewPhotos.mladentsy = result;
  result.length = 10; 
})

// Preparing data from app.json
let galleryNamesEn;
let galleryNames;
let prices;
let pricesEn;

async function init (){
  try { 
    const appJson = await readFile('./app/app.json');
    const appObj = JSON.parse(appJson);
    galleryNames = appObj.galleryNames;
    galleryNamesEn = galleryNames.map((name)=>{
      return convertorRu2En(name);
    });
    prices = appObj.prices;
    pricesEn = prices.map((name)=>{
      return convertorRu2En(name, '-stoimost');
    });
  } catch (error) {
    console.log(error, ' - error from init func')
  }
}
init().then();


/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('index', {
    title: 'Express',
    isAdmin: true,
    prewPhotos:indexPrewPhotos,
    galleryNames,
    galleryNamesEn,
    prices,
    pricesEn
  });
});

// router for every pages START
const pagesList = [
  'kontakty',
  'novorozhdennye-stoimost',
  'admin',
  'mladentsy-stoimost',
  'o-semke',
  'article-newborn-session',
  'article-session-price',
  'article-not-waste-newborn-session-time',
  'article-store',
  'gallery',
  'prew-gallery',
  'fotoproduktsiia-stoimost',
  'obo-mne',
  'otzyvy',
  'aktsii'
];

// router for every pages
pagesList.map((name, i)=>{
  router.get('/' + name, async function (req, res, next) {
    res.render(name, {
      title: name,
      galleryNames,
      galleryNamesEn,
      prices,
      pricesEn
    });
  });
});

// routers generator start
const routersList = [
  'novorozhdennye',
  'mladentsy',
  'fotoproduktsiia'
];

// router for every albums
routersList.map((name, i)=>{
  /* GET every album page. */
  router.get(`/${name}/:album`, function (req, res, next) {
    albumChoice(req, res, name);
  });
  /* GET every prew-album-page. */
  router.get('/' + name, async function (req, res) {
    await getPrewGallery(req, res, name);
  });
});

async function getPrewGallery(req, res, to){
  const prewPhotos = await getPrewPhotos(to);
  const seo = await getSeoDescriptions(to);
  response(res, to, prewPhotos, seo)
}

function getSeoDescriptions(to) {
  return new Promise( async (resolve, reject)=>{
    try {
      // path to JSON
      let destination = path.join(__dirname, `../public/img/photos/${to}/info.json`);
      const seoJson = await readFile(destination);
      const seoObj = JSON.parse(seoJson);
      resolve(seoObj)
    } catch (error) {
      console.log(error, 'error - getSeoDescriptions')
    }
  });
}

function getPrewPhotos(to) {
  return new Promise( async (resolve, reject)=>{
    try {
      let prewPhotos = [];
      let counter = 0;
      // path to albums
      let destination = path.join(__dirname, `../public/img/photos/${to}`);
      // get folders - array of albums names 
      let folders = await readdir(destination);
      // Find JSON file and remove it
      folders = removeInfo(folders);
      // build paths to each album
      folders.map(async (folder, i) => {
        let _path = path.join(__dirname, `../public/img/photos/${to}/${folder}`);
        let files = await readdir(_path);
        let data;
        let infoExist = files.some(file => file == 'info.json')  
        if (infoExist) {
          data = await readFile(_path + '/info.json');
          data = JSON.parse(data);
        } else {
          data = {
            title: 'Скоро будет'
          };
        }
        prewPhotos.push({
          href: `./${to}/${folder}`,
          url: `./img/photos/${to}/${folder}/${files[0]}`,
          name: data.title,
          data: data
        });
        counter++;
        if (counter == folders.length) {
          newDate = prewPhotos.sort((a, b) => {
            return Number(b.data.date) - Number(a.data.date)
          });
          resolve(newDate);
        } 
        else console.log('...asembling', i)
      });
    } catch (error) {
      console.log(error, 'error - getPrewPhotos');
    }
  })
}

//
// some universal render for pages
//
function response(res, to, prewPhotos, seo) {
  res.render('prew-gallery', {
    title: to,
    seo,
    prewPhotos,
    galleryNames,
    galleryNamesEn,
    prices,
    pricesEn,
    isAdmin: true
  });
}

function readdir(path) {
  // if not mistake and everything is ok - resolve, else - reject
  return new Promise((resolve, reject) => {
    // path for direct reading
    fs.readdir(path, (err, names) => {
      if (err) reject(err);
      else resolve(names);
    });
  });
}

//GET and show page - prew-gallery
function prewGallery(target, res, next) {
  res.render(target, {
    title: target
  });
}

//find and remove file - info.json 
function removeInfo(files) {
  return files.filter( item => item !== "info.json")
}

/* Common func to GET page to baby, newborn and photo-book. */
async function albumChoice(req, res, albumCategory) {
  // Получаем ссылку в браузере
  const album = req.params.album;
  //читаем сео
  const seo = await getSeoDescriptions(`${albumCategory}/${album}`);
  // Указываем откуда читать
  let destination = path.join(__dirname, `../public/img/photos/${albumCategory}/${album}`);
  //читаем, передаем в шаблонную страницу gallery данные которые прочитали
  fs.readdir(destination, (err, files) => {
    // Находим файл JSON и убираем его.
    files = removeInfo(files);
    files = files.sort((a, b) => {
      let _a = Number(a.split('.')[0]);
      let _b = Number(b.split('.')[0]);
      return _a - _b;
    });
    
    res.render('gallery', {
      category: albumCategory,
      title: album, //Передаем заголовок для вкладки
      seo,
      photos: files, //Передаем содержимое папки
      galleryNames,
      galleryNamesEn,
      prices,
      pricesEn,
      isAdmin: true
    });
  });
}

/* Get article pages */
router.get('/article/:title', async function(req, res){
  const articleJson = await readFile('./json/articles/example.json');
  const articleObj = JSON.parse(articleJson);
  res.render('article', {
    title: 'example',
    articleObj
  });
})


/* POST contacts page. */
router.post('/api/mail', function (req, res, next) {
  try {
    let type, subject, phone;
    if (req.body.type == 'feedback') {
      type = 'Отзыв';
      subject = 'Ваш отзыв принят, спасибо!';
      phone = ''
    } else {
      type = 'Заявка';
      subject = 'Ваша заявка принята, с Вами свяжуться в ближайшее время';
      phone = `Контактный телефон: ${req.body.phone || 88888}<br>`
    }

    mail.send(
      `Алина Пятигор ${process.env.USERFROM}`, // from
      `${process.env.USERTO}`, // to
      type, // subject
      // html
      `<p>
              ${type}: <br>
              Имя: ${req.body.name || 88888}<br>
              Почтовый адрес: ${req.body.email || 88888}<br>
              ${phone}
              Текст: ${req.body.text || 88888}
          </p>` +
        `Время создания: ${new Date().toLocaleDateString("ru-RU")}`,
    );
    mail.send(
      `Алина Пятигор ${process.env.USERFROM}`, // from
      req.body.email, // to
      subject, // subject
      // html
      `<p>
              ${type}: <br>
              Имя: ${req.body.name || 88888}<br>
              Почтовый адрес: ${req.body.email || 88888}<br>
              ${phone}
              Текст: ${req.body.text || 88888}
          </p>` +
        `Время создания: ${new Date().toLocaleDateString("ru-RU")}`,
    );
  } catch (error) {
    console.log('Send error', error);
  }
  res.json({
    ok: true
  });
});

module.exports = router;