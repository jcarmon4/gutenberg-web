var express = require('express'),
  config = require('../../config/config'),
  router = express.Router(),
  db = require('../models');
var redis = require('redis');

var redisClient = redis.createClient("redis://h:padd1089bb3eef4b1bf8c5cd5019461d8f7ad76b4c6960640f882ce0f2a9c86a6@ec2-34-224-49-43.compute-1.amazonaws.com:65139");
redisClient.select(1);
//var redisClient = redis.createClient({host:'localhost', port: '6379', db: 7});

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
  relatedDocumentsFromService(query).then(function (docsMap) {
    console.dir(docsMap);
    Object.keys(docsMap).forEach(function (key){
      sortedDocsArray.push([key, docsMap[key]]);
    });
    sortedDocsArray.sort(function (a, b) {
      return b[1] - a[1];
    });
    console.log("Sorted docs");
    console.dir(sortedDocsArray);
    res.render('documentDetail', {
      title: 'Gestión de Articulos',
      baseUrl: config.baseUrl,
      articles: sortedDocsArray
    });
  }).catch(function (error) {
    console.log("Promise relatedDocumentsFromService Rejected");
    console.error(error);
  });
});

var relatedDocumentsFromService = function (doc) {
  var key = "similarity:"+doc;
  return new Promise(function (resolve, reject) {
    redisClient.hgetall(key, function (error, items) {
      if (error) {
        reject(error);
      } else {
        resolve(items);
      }
    });
  });
};
