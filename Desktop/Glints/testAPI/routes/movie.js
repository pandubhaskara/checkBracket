const express = require('express')
const router = express.Router()
const movie = require("../controllers/movie")
const {authentication} = require('../middlewares/auth');
const { isAdmin } = require('../middlewares/isAdmin');

router.get('/', authentication, movie.getMovie)
router.post('/', movie.postMovie)
router.get('/:id', movie.getByIdMovie)
router.put('/:id', movie.updateMovie)
router.put('/:id', movie.deleteMovie)

module.exports = router