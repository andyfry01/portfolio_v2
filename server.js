var path = require('path');
var express  = require('express');
// static file compression middleware
var compress = require('compression');
// middleware that allows you to parse request body, json, etc.
express.json() 
express.urlencoded()

var methodOverride = require('method-override');
// logging middleware
var morgan  = require('morgan');
// middleware to return X-Response-Time with a response
var responseTime = require('response-time');
// middleware to serve a favicon prior to all other assets/routes
var favicon = require('serve-favicon');

var app = express();

app.use(morgan('dev'));
app.use(responseTime());

app.use(methodOverride());

app.use(compress());

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts', express.static(path.join(__dirname, 'node_modules')));


app.listen(process.env.PORT || 3000);

console.log('server started on port: ', process.env.PORT || 3000);
