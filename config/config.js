var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    baseUrl: "/",
    root: rootPath,
    app: {
      name: 'gutenberg-web'
    },
    port: process.env.PORT || 3000,
    db: 'sqlite://localhost/gutenberg-web-development',
    storage: rootPath + '/data/gutenberg-web-development'
  },

  test: {
    baseUrl: "/nodeArticulos/",
    root: rootPath,
    app: {
      name: 'gutenberg-web'
    },
    port: process.env.PORT || 3000,
    db: 'sqlite://localhost/gutenberg-web-test',
    storage: rootPath + '/data/gutenberg-web-test'
  },

  production: {
    baseUrl: process.env.URL || 'http://localhost:3000',
    root: rootPath,
    app: {
      name: 'gutenberg-web'
    },
    port: process.env.PORT || 3000,
    db: 'sqlite://localhost/gutenberg-web-production',
    storage: rootPath + 'data/gutenberg-web-production'
  }
};

module.exports = config[env];
