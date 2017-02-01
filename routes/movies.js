var express = require('express');
var router = express.Router();
var models = require('../db/models/index');
const authHelpers = require('../auth/auth-helpers');

/* GET movies listing. */
router.get('/', authHelpers.loginRequired, (req, res, next) => {
    if (req.user)
  models.Movie.findAll({}).then(function(movies) {
  res.render('movies/index', {
    title: 'Movies',
    movies: movies
    });
  });
});



router.get('/', authHelpers.loginRedirect, (req, res)=> {
  res.render('auth/login');
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

router.post('/', function(req, res, next) {
  models.Movie.create({
    title: req.body.title,
    synopsis: req.body.synopsis
  }).then(function() {
    res.redirect('/movies');
  });
});

router.delete('/:id', function(req,res,next) {
  models.Movie.destroy({
    where: {id: req.params.id}
  }).then(function(movie) {
    res.redirect('/movies');
  });
});

module.exports = router;
