const express = require('express')
const router = express.Router()
const character = require("../controllers/character")

router.get('/', character.getCharacter)
router.post('/', character.postCharacter)
router.put('/:id', character.updateCharacter)
router.delete('/:id', character.deleteCharacter)

module.exports = router