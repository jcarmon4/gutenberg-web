

var express = require('express'),
  config = require('./config/config');
//  db = require('./app/models');

var app = express();

module.exports = require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});


