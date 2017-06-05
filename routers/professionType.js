var express      = require("express");
var mongoose     = require('mongoose');
// set Promise provider to bluebird
mongoose.Promise = require('bluebird');
var Profession   = require('../models/professionType');
var validator    = require('express-route-validator')

// API routes
var router = express.Router();

router.route('/professions')
  .get(function (req, res) {
        var promise = Profession.find().exec();
        promise.then(function(professions) {
           response(res,professions);
        })
        .catch(function(err){
            // just need one of these
            //console.log('error:', err);
            res.status(500).send(err.message);
        });
    })
  .post(validator.validate({
         body: {
                code:             { isRequired: true },
                description:      { isRequired: true }
              },
              headers: {
                'content-type': { isRequired: true, equals: 'application/json' }
              }
        }),
        function(req, res) {
            //console.log('POST');
            //console.log(req.body);
            var profession = new Profession({
                  code: req.body.code,
                  description: req.body.description
            });
            var promise = profession.save();
            promise.then(function(profession) {
              response(res,profession);
            })
            .catch(function(err){
              // just need one of these
              //console.log('error:', err);
              res.status(500).send(err.message);
            });
        }
  );

router.route('/professions/:idProfession')
  .get(validator.validate({
          params: {
            idProfession: { isRequired: true , isMongoId: true }
          }
      }),
      function(req, res) {
          var promise = Profession.findById(req.params.idProfession).exec();
          promise.then(function(profession) {
            //console.log('GET /professions/' + req.params.idProfession);
             response(res,profession);
          })
          .catch(function(err){
            // just need one of these
            //console.log('error:', err);
            res.status(500).send(err.message);
          });
       }
  )
  .put(validator.validate({
          params: {
            idProfession: { isRequired: true , isMongoId: true }
          }
      }),
      function(req, res) {
          //console.log('PUT');
          //console.log(req.body);
          var promise = Profession.findById(req.params.idProfession).exec();
          promise.then(function(profession) {
            if(profession){
                profession.code = req.body.code,
                profession.description = req.body.description
                return profession.save(); // returns a promise
            }
          })
          .then(function(profession) {
              var message = "Profession successfully updated.";                
              response(res,profession,message);
          })
          .catch(function(err){
              // just need one of these
              //console.log('error:', err);
              res.status(500).send(err.message);
          }); 
      }
  )
  .delete(validator.validate({
              params: {
                idProfession: { isRequired: true, isMongoId: true }
              }
          }),
          function(req, res) {
              Profession.findByIdAndRemove(req.params.idProfession, function (err, profession) {  
                 if(err)
                    res.status(500).send(err.message);
                 var message = "Profession successfully deleted.";                
                 response(res,profession,message);
              });
          }
  );
var response = function(res,profession,messageOK,messageNotOK){
    if(profession) {
      var resp = {
                  message: messageOK,
                  id:profession._id
                };
      if(messageOK){
        res.status(200).jsonp(resp);
      }else{
        res.status(200).jsonp(profession);
      }
    }else{
      var dfault =  "Profession Not Found";
      if(messageNotOK){
        res.status(400).send(messageNotOK);
      }else{
        res.status(400).send(dfault);
      }
    }
};
module.exports = router