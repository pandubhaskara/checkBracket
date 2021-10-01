const express = require('express')
const router = express.Router()
const movie = require("../controllers/movie")
const {authentication} = require('../middlewares/auth');

router.get('/', movie.getMovie)
router.post('/', movie.postMovie)
router.get('/:id', movie.getByIdMovie)
router.put('/:id', movie.updateMovie)
router.put('/:id', movie.deleteMovie)

module.exports = router