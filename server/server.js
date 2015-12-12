var swig  = require('swig');
var routes = require('./routes');
var express = require('express');
var config = require('./config');
var app = express();
var morgan = require('morgan');
var parser = require('body-parser');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

var initServer = function() {
  // attaches all the routes to the server
  routes.setup(app);
  var port = process.env.PORT || 8080;
  var server = app.listen(port);
  console.log("Express server listening on %d in %s mode", port, app.settings.env)
}

mongoose.connect(config.database);
mongoose.connection.on('error', function(){
  console.info('couldnt connect, try running mongod');
});
app.use(morgan('tiny'));
app.use(parser.json());
app.use(parser.urlencoded({extended: false}));

initServer();
exports.app = app;