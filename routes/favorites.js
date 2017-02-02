const express = require('express');
const router = express.Router();
var models = require('../db/models/index');


router.post('/', function(req,res, next) {
  models.Favorites.create({
    user: req.user.id,
    movie: req.body.id
  }).then(function() {
    console.log('hi');
  })
})




module.exports = router;
