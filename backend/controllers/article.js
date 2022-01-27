'use strict'
// const { body, validationResult } = require('express-validator');
var validator = require('validator');
var fs = require('fs');
var path = require('path');

var Article = require('../models/article');


var controller = {

    datosCurso: (req, res) => {
        return res.status(200).send({
            curso: 'Frameworks JS',
            autor: 'alan',
            url: 'alansignetti.com'
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'Test for article controllers'
        });
    },

    save: (req, res) => {
        // receive POST params
        var params = req.query;
        // Validate data (validator)
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        } catch (err) {
            console.log(params);
            return res.status(200).send({
                status: 'error',
                message: 'Missing data'
            });
            
        }

        if (validate_title && validate_content) { // if not empty
            // Create the object
            var article = new Article();
           
            // Asign values
            article.title = params.title;
            article.content = params.content;
            article.image = null;

            // Save the article
            article.save((err, articleStored) => {

                if (err || !articleStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'Article not saved'
                    });
                } 

                // Return response
                return res.status(200).send({
                    status: 'success',
                    article: articleStored
                });

            });
        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Invalid Data'
            });
        }
    },

    getArticles: (req, res) => {
        
        var query = Article.find({}); 
        
        // var last = parseInt(req.params.last);
        var last = req.params.last;
        // console.log(typeof(last));
        if (last && last !=null && last !=undefined ) {
            query.limit(2);
        };
        console.log(last)
        // Find 
        query.sort('-_id').exec((err, articles) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error returning the articles'
                });
            };
            if (!articles) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No articles to show'
                });
            };
            return res.status(200).send({
                status: 'success',
                articles
            });
        });


        
    },

    getArticle: (req, res) => {
        // Recoger el id de la url
        var articleId = req.params.id;
        if (!articleId || articleId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'Article does not exist'
            });
        }
        // Comprobar que existe
        Article.findById(articleId, (err, article) => {
            
            if (err || !article) {
                return res.status(404).send({
                    status: 'error',
                    message: 'Article does not exist'
                });
            }

            // Devolverlo en json
            return res.status(200).send({
                status: 'success',
                article
            });
        });
    },

    update: (req, res) => {
        // Receive  ID  by URL
        var articleId = req.params.id;


        // Receive data by PUT
        var params = req.body;

        // Validar datos
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        } catch (err) {
            return res.status(404).send({
                status: 'error',
                message: 'Missing data to send'
            });
        }

        if (validate_title && validate_content) {
            // Find and Update
            Article.findOneAndUpdate({_id: articleId}, params, {new:true}, (err, articleUpdated) =>{
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error to update'
                    });
                }

                if (!articleUpdated) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'Article does not exist'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    article: articleUpdated
                });
            });
        } else {
            // Devolver respuesta
            return res.status(200).send({
                status: 'error',
                message: 'Incorrect validation'
            });
        } 
        
    },

    delete: (req, res) => {
         // Receive  ID  by URL
        var articleId = req.params.id;

        // find and delete
        Article.findOneAndDelete({_id: articleId}, (err, articleRemoved) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error deleting'
                });
            }

            if (!articleRemoved) {
                return res.status(404).send({
                    status: 'error',
                    message: 'Article did not removed, maybe article does not exist'
                });
            }

            return res.status(200).send({
                status: 'success',
                article: articleRemoved
            });
        });

    },

    upload: (req, res) => {
        

        // Recoger el fichero de la peticion 
        var file_name = 'Image not uploaded...';

        if (!req.files) {
            return res.status(404).send({
                status: 'error',
                message: file_name
            });
        }
        

        // Conseguir nombre y la extension del archivo
        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\'); 
        
 
        // Nombre del archivo
        var file_name = file_split[2];

        // Extension del fichero
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];

        // Comprobar la extension, solo imagenes, si es valido borrar el fichero
        if (file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif') {
            // Borrar el archivo subido
            fs.unlink(file_path, (err) =>{
                return res.status(200).send({
                    status: 'error',
                    message: 'The image extension is not valid'
                });
            });
        } else {
            // Si todo es valido, sacando if de la url
            var articleId = req.params.id;
            // Buscar el articulo, asignarle el nombre de la imagen y actualizarla
            Article.findOneAndUpdate({_id: articleId}, {image: file_name}, {new:true}, (err, articleUpdated) => {
                if (err || !articleUpdated) {
                    return res.status(200).send({
                        status: 'error',
                        message: 'Error saving article image'
                     });
                }
                
                return res.status(200).send({
                   status: 'success',
                   article: articleUpdated
                });
            });            
        };

        
    }, //end upload file

    getImage: (req, res) => {
        var file = req.params.image;
        var path_file = './upload/articles/'+file;

      
        if(fs.existsSync(path_file)) {
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(404).send({
                    status: 'error',
                    message: 'The image does not exist'
                });
            }
    
    },

    search: (req, res) => {
        //  String to find
        var searchString = req.params.search;
        // Find or 
        // Verifica si el string que se busca esta contenido dentro de el titulo o el contenido
        Article.find({ "$or": [
            {"title": {"$regex": searchString, "$options": "i"}},
            {"content": {"$regex": searchString, "$options": "i"}}
        ]})
        .sort([['date', 'descending']])
        .exec((err, articles) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Request error'
                });
            };

            if (!articles || articles.length <= 0) {
                return res.status(404).send({
                    status: 'error',
                    message: 'There are no articles that match your search'
                });
            };

            return res.status(200).send({
                status: 'success',
                articles
            });
        });

        
    },
}; // end controller

module.exports = controller;