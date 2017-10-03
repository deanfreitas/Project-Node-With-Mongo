var mongoose = require('mongoose');

var options = { promiseLibrary: require('bluebird') };
var uri = 'mongodb://localhost/collectionTest';
var db = mongoose.createConnection(uri, options);

mongoose.Promise = require('bluebird');

module.exports = db;