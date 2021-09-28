const express = require('express')
const router = express.Router()
const movie = require("../controllers/movie")

router.get('/', movie.getMovie)
router.post('/', movie.postMovie)
router.put('/:id', movie.updateMovie)
router.put('/:id', movie.deleteMovie)

module.exports = router