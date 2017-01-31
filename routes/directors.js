var express = require('express');
var router = express.Router();
var models = require('../db/models/index');

router.get('/', function(req, res, next) {
  models.Director.findAll({}).then(function(directors) {
    res.render('directors/index', {
      title: 'directors',
      directors: directors
    });
  });
});

router.get('/new', function(req, res, next) {
  res.render('directors/new', { title: 'create a new director'});
});

router.post('/', function(req, res, next) {
  models.Director.create({
    name: req.body.name,
  }).then(function() {
    res.redirect('/directors')
  });
});

router.delete('/:id', function(req, res, next) {
  models.Director.destroy({
    where: { id: req.params.id }
  }).then(function(director) {
    res.redirect('/directors');
  });
});

router.get('/:id', function(req, res, next) {
  models.Director.findById(req.params.id).then(function(director) {
    res.render('directors/show', { director: director });
  });
});

router.get('/:id/edit', function(req, res, next) {
  models.Director.findById(req.params.id).then(function(director) {
    res.render('directors/edit', {director: director});
  });
});

router.put('/:id', function(req, res, next) {
  models.Director.update({
    name: req.body.name,
  }, { where: { id: req.params.id } }).then(function() {
    res.redirect('/directors/' + req.params.id);
  });
});

module.exports = router;
