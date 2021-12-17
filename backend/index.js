'use strict'

const mongoose = require('mongoose');

var server = 'mongodb://localhost:27017/';
var db = 'api_rest_blog';
var url = server+db;


var app = require('./app');
var port = 3900;

mongoose.Promise = global.Promise;
mongoose.connect(url,{useNewUrlParser:true})
        .then(()=>{
            

            // create server
            app.listen(port,()=>{
                console.log('Working!. Port:'+ port);
            });


});






