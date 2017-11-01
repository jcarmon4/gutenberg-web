var express = require('express'),
  config = require('../../config/config'),
  router = express.Router(),
  db = require('../models');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  db.Article.findAll().then(function (articles) {
    res.render('index', {
      title: 'Gutenberg',
      articles: articles
    });
  });
});

router.post('/doc', function (req, res, next) {
  var query = req.body.doc;
  var sortedDocsArray = [];
  console.log(query);
  res.render('index', {
    title: 'Gestión de Articulos',
    baseUrl: config.baseUrl,
    articles: sortedDocsArray
  });
  // relatedDocumentsFromService(query).then(function (docsMap) {
  //   console.dir(docsMap);
  //   Object.keys(docsMap).forEach(function (key){
  //     sortedDocsArray.push([key, docsMap[key]]);
  //   });
  //   sortedDocsArray.sort(function (a, b) {
  //     return b[1] - a[1];
  //   });
  //   console.log("Sorted docs");
  //   console.dir(sortedDocsArray);
  // }).catch(function (error) {
  //   console.log("Promise relatedDocumentsFromService Rejected");
  //   console.error(error);
  // });
});
