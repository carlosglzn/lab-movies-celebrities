const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get('/celebrities', (req, res) => {
    Celebrity.find({})
        .then((celebritiesFound) => {
            console.log(celebritiesFound)
            res.render("celebrities/celebrities.hbs", {
                celebrities: celebritiesFound
            })
        })
        .catch((e) => {
            console.log(e)
        })
})


router.get('/celebrities/create', (req, res) => {
    res.render("celebrities/new-celebrity.hbs")
})

router.post('/celebrities/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body

    Celebrity.create({name, occupation, catchPhrase})
        .then((celebrityCreated) => {
            console.log(celebrityCreated)
            res.redirect("/celebrities")
        })
        .catch((e) => {
            console.log(e)
            res.render("celebrities/new-celebrity.hbs")
        })
})

module.exports = router;
