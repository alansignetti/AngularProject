'use strict'


// modules
const express = require('express');

var bodyParser = require('body-parser');
// express (http)
const app = express();
 

// routing files
var article_routes = require('./routes/article');

// middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next(); // permite pasar del middleware a lo siguiente
});



// Añadir prefijos a rutas / cargar rutas
app.use('/api', article_routes);
// export module
module.exports = app;








