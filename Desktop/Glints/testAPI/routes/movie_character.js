const express = require('express')
const router = express.Router()
const movchar=require("../controllers/movie_character")

router.get('/', movchar.get)
router.post('/', movchar.add)
router.put('/:id', movchar.update)
router.delete('/', movchar.delete)

module.exports = router