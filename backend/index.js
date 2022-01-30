'use strict'

const mongoose = require('mongoose');

// var server = 'mongodb://localhost:27017/';
var server = 'mongodb+srv://darkkaioshin:alan12299@angularproject-database.q7l6m.mongodb.net/angularproject?retryWrites=true&w=majority'
var db = 'api_rest_blog';
var url = server+db;


var app = require('./app');
// var port = 3900;
var port = process.env.PORT || 3900

mongoose.connect(server,{useNewUrlParser:true})
        .then(()=>{
            

            // create server
            app.listen(port,()=>{
                console.log('Working!. Port:'+ port);
            });


});



