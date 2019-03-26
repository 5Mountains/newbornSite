var express = require('express');
var router = express.Router();
var path = require('path');
const mail = require('../modules/mail.js');
const fs = require('fs');

// let indexPrewPhotos = {}
// getPrewPhotos('novorozhdennye').then((result)=>{
//   indexPrewPhotos.novorozhdennye = result;
//   // console.log(result, 'getPrewPhotos result from backEnd')
// })

// getPrewPhotos('mladentsy').then((result)=>{
//   indexPrewPhotos.mladentsy = result;
//   // console.log(result, 'getPrewPhotos result from backEnd')
// })


// Preparing data from app.json

// let galleryNamesEn;
// let galleryNames;
// let prices;
// let pricesEn;

// async function init (){
//   try { 
//     const appJson = await readFile('./app/app.json');
//     const appObj = JSON.parse(appJson);
//     galleryNames = appObj.galleryNames;
//     galleryNamesEn = galleryNames.map((name)=>{
//       return convertorRu2En(name);
//     });
//     prices = appObj.prices;
//     pricesEn = prices.map((name)=>{
//       return convertorRu2En(name, '-stoimost');
//     })
//   } catch (error) {
//     console.log(error, ' - error from init func')
//   }
// }
// init().then();


/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('index', {
    title: 'Express'
    // isAdmin: true,
    // prewPhotos:indexPrewPhotos, //.novorozhdennye,
    // galleryNames,
    // galleryNamesEn,
    // prices,
    // pricesEn
  });
});

// router for every pages START
const pagesList = [
  'mladentsy-2018',
  'novorozhdennye-2019',
  // 'kontakty',
  // 'novorozhdennye-stoimost',
  // 'admin',
  // 'mladentsy-stoimost',
  // 'o-semke',
  // 'article',
  // 'article-store',
  // 'gallery',
  // 'prew-gallery',
  // 'fotoproduktsiia-stoimost',
  // 'obo-mne',
  // 'otzyvy'
];

// router for every pages
pagesList.map((name, i)=>{
  router.get('/' + name, async function (req, res, next) {
    res.render(name, {
      title: name,
      // galleryNames,
      // galleryNamesEn,
      // prices,
      // pricesEn
    });
  });
});

// router for only photobooks album
// photobooks.map((name, i)=>{
//   router.get('/' + name, async function (req, res) {
//     await getPrewGallery(req, res, name);
//   });
// })

// routers generator start
// const routersList = [
//   'novorozhdennye',
//   'mladentsy',
//   'fotoproduktsiia'
// ];

// router for every albums
// routersList.map((name, i)=>{
//   router.get('/' + name, async function (req, res) {
//     await getPrewGallery(req, res, name);
//   });
// })

// async function getPrewGallery(req, res, to){
//   const prewPhotos = await getPrewPhotos(to)
//   // console.log(prewPhotos, 'newPrewPhotos')
//   response(res, to, prewPhotos)
// }


// function getPrewPhotos(to) {
//   return new Promise( async (resolve, reject)=>{
//     // console.log('start of getPrewPhotos')
//     try {
//       let prewPhotos = [];
//       let counter = 0;
  
//       // path to albums
//       let destination = path.join(__dirname, `../public/img/photos/${to}`);
  
//       // get folders - array of albums names 
//       let folders = await readdir(destination);
  
//       // build paths to each album
//       folders.map(async (folder, i) => {
//         let _path = path.join(__dirname, `../public/img/photos/${to}/${folder}`);
  
//         let files = await readdir(_path);
  
//         let data;
//         let infoExist = files.some(file => file == 'info.json')
  
//         if (infoExist) {
//           data = await readFile(_path + '/info.json');
//           data = JSON.parse(data);
//         } else {
//           data = {
//             title: 'Скоро будет'
//           }
//         }
  
//         prewPhotos.push({
//           href: `./${to}/${folder}`,
//           url: `./img/photos/${to}/${folder}/${files[0]}`,
//           name: data.title,
//           data // new way of writing -> data:data
//         })
  
//         // the all ?
//         // console.log(counter, 'counter')
//         counter++;
//         // console.log(counter, 'counter', prewPhotos)
//         if (counter == folders.length) {
//           console.log('prewPhotos is OK from return')
//           newDate = prewPhotos.sort((a, b)=>a.date>b.date) 
//           // console.log(newDate)

//           resolve(prewPhotos)
//         } 
//         else console.log('...asembling', i)
  
//       });
//     } catch (error) {
//       console.log(error, 'error - getPrewPhotos')
//     }
//   })
// }

//
// some universal render for pages
//
// function response(res, to, prewPhotos) {
//   res.render('prew-gallery', {
//     title: to,
//     prewPhotos,
//     galleryNames,
//     galleryNamesEn,
//     prices,
//     pricesEn,
//     isAdmin: true
//   });
//   // console.log(to, prewPhotos);
// }

// function readdir(path) {
//   // if not mistake and everything is ok - resolve, else - reject
//   return new Promise((resolve, reject) => {
//     // path - путь, направление для чтения директории
//     fs.readdir(path, (err, names) => {
//       if (err) reject(err)
//       else resolve(names)
//     });
//   });
// }

//GET and show page - prew-gallery
// function prewGallery(target, res, next) {
//   res.render(target, {
//     title: target
//   });
// }

//find and remove file - info.json 
// function removeInfo(files) {
//   let index = files.indexOf('info.json')
//   files.splice(index, 1)
//   return files
// }

/* Common func to GET page to baby, newborn and photo-book. */
// function albumChoice(req, res, albumCategory) {
//   // Получаем ссылку в браузере
//   const album = req.params.album;
//   // Указываем откуда читать
//   let destination = path.join(__dirname, `../public/img/photos/${albumCategory}/${album}`);
//   //читаем, передаем в шаблонную страницу gallery данные которые прочитали
//   fs.readdir(destination, (err, files) => {
//     // Находим файл JSON и убираем его.
//     files = removeInfo(files);
//     res.render('gallery', {
//       category: albumCategory,
//       //Передаем заголовок для вкладки
//       title: album,
//       //Передаем содержимое папки
//       photos: files,
//       galleryNames,
//       galleryNamesEn,
//       prices,
//       pricesEn,
//       isAdmin: true
//     });
//   });
// }

/* Get article pages */
// router.get('/article/:title', async function(req, res){
//   const articleJson = await readFile('./json/articles/example.json');
//   const articleObj = JSON.parse(articleJson);
//   res.render('article', {
//     title: 'example',
//     articleObj
//   });
// })




/* GET newborn page. */
// router.get('/novorozhdennye/:album', function (req, res, next) {
//   albumChoice(req, res, 'novorozhdennye');
// });

/* GET baby page. */
// router.get('/mladentsy/:album', function (req, res, next) {
//   albumChoice(req, res, 'mladentsy');
// });

/* GET photo-book page. */
// router.get('/fotoknigi/:album', function (req, res, next) {
//   albumChoice(req, res, 'fotoknigi');
// });

/* POST contacts page. */
router.post('/api/mail', function (req, res, next) {
  // console.log('/api/mail', req.body)
  try {
    mail.send(
      'Vitaliy <fivemountains.dev@gmail.com> ', // from
      'pyatygorr@gmail.com', // to
      'Підтвердження пошти | Mail Confirmation', // subject
      // html
      `<p>
              Заявка на фотосессію:<br>
              Ім'я замовника:${req.body.name || 88888}<br>
              Поштова скрінька замовника:${req.body.email || 88888}<br>
              Контактний телефон замовника:${req.body.phone || 88888}<br>
              Текст телефон замовника:${req.body.text || 88888}
          </p>` +
      new Date(),
    )
    mail.send(
      'Vitaliy <fivemountains.dev@gmail.com> ', // from
      req.body.email, // to
      'Ваше звернення прийнято, з Вами звяжуться найближчим часом', // subject
      // html
      `<p>
              Дані Вашої заявки на фотосессію:<br>
              Ім'я замовника:${req.body.name || 88888}<br>
              Поштова скрінька замовника:${req.body.email || 88888}<br>
              Контактний телефон замовника:${req.body.phone || 88888}<br>
              Текст замовника:${req.body.text || 88888}
          </p>` +
      new Date(),
    )
  } catch (error) {
    console.log('Send error')
  }

  res.json({
    ok: true
  });
});


// router.post('/api/admin-login', function(req, res){
//   console.log(req.body);

//   res.json({
//     ok: 'fuck you'
//   });
// })

//



module.exports = router;