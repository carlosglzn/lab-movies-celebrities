const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movies.model");

const router = require("express").Router();


router.get('/movies', (req, res) => {
    Movie.find({})
        .then((moviesFound) => {
            console.log(moviesFound)
            res.render("movies/movies.hbs", {
                movies: moviesFound
            })
        })
        .catch((e) => {
            console.log(e)
        })
})


router.get('/movies/create', (req, res) => {
    Celebrity.find({})
        .then((celebritiesFound) => {
            console.log(celebritiesFound)
            res.render("movies/new-movie.hbs", {
                celebrities: celebritiesFound
            })
        })
        .catch((e) => {
            console.log(e)
        })
    
})



router.post('/movies/create', (req, res) => {
    const { title, genre, plot, cast } = req.body

    Movie.create({title, genre, plot, cast})
        .then((movieCreated) => {
            console.log(movieCreated)
            res.redirect("/movies")
        })
        .catch((e) => {
            console.log(e)
            res.render("movies/new-movie.hbs")
        })
})

router.get('/movies/:id', (req, res) => {
    const { id } = req.params
    
    Movie.findById(id)
        .populate("cast")
        .then((movieFound) => {
            console.log(movieFound)
            res.render("movies/movie-details", {
                movie: movieFound
            })
        })
        .catch((e) => {
            console.log(e)
        })
})

router.post('/movies/:id/delete', (req, res) => {
    const { id } = req.params

    Movie.findByIdAndDelete(id)
        .then((movieRemoved) => {
            console.log(movieRemoved)
            res.redirect("/movies")
        })
        .catch((e) => {
            console.log(e)
        })
})

router.get('/movies/:id/edit', (req, res) => {
    const { id } = req.params

    Movie.findById(id)
        .then((movie) => {
            Celebrity.find({})
                .then((celebrities) => {
                    res.render("movies/edit-movie", {movie, celebrities})
                })
        })
        .catch((e) => {
            console.log(e)
        })
})

router.post('/movies/:id/edit', (req, res) => {
    const { id } = req.params
    const { title, genre, plot, cast } = req.body

    Movie.findByIdAndUpdate(id, {title, genre, plot, cast}, {new: true})
        .then((movieUpdated) => {
            console.log(movieUpdated)
            res.redirect('/movies')
        })
        .catch((e) => {
            console.log(e)
        })
})


module.exports = router