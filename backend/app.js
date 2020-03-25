var express = require('express');
var mongoose = require('mongoose');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var visitantesRouter = require('./routes/visitantes');

var app = express();


// CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

//Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//RUTAS
app.use('/', indexRouter);
app.use('/visitantes', visitantesRouter);


// Conexión DB
mongoose.connection.openUri('mongodb://midaw1:midaw1@ds119080.mlab.com:19080/daw_events', (err, res) => {
    if (err) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
});

module.exports = app;
