var express = require('express');
var router = express.Router();
var models = require('../db/models/index');

/* GET movies listing. */
router.get('/', function(req, res, next) {
  models.Movie.findAll({}).then(function(movies) {
  res.render('movies/index', {
    title: 'Movies',
    movies: movies
    });
  });
});

router.get('/new', function(req, res, next) {
  res.render('movies/new', {
    title: 'Create a New Movie',
    // movie: movie
  });
});

router.get('/:id', function(req, res, next) {
  models.Movie.findById(req.params.id).then(function(movie) {
    res.render('movies/show', {
    movie: movie
    });
  })
});

router.get('/:id/edit', function(req, res, next) {
  models.Movie.findById(req.params.id).then(function(movie) {
    res.render('movies/edit', {
      title: 'edit | ' + movie.title,
      movie: movie
    });
  });
});

router.put('/:id', function(req, res, next) {
  models.Movie.update({
    title: req.body.title,
    synopsis: req.body.synopsis
  }, { where: { id: req.params.id } }).then(function() {
    res.redirect('/movies/' + req.params.id);
  });
});

module.exports = router;
