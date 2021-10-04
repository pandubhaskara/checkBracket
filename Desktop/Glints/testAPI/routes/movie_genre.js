const express = require('express')
const router = express.Router()
const movgenre=require("../controllers/movie_genre")

router.get('/', movgenre.get)
router.post('/', movgenre.add)
router.put('/:id', movgenre.update)
router.delete('/', movgenre.delete)

module.exports = router