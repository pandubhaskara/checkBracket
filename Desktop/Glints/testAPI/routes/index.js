const express = require("express")
const movie= require('./movie')
const character=require('./character')
const movchara=require('./movie_character')
const router= express.Router()

router.get('/',(req,res)=>{
    res.send('masuk router')
})
router.use('/movie', movie)
router.use('/character', character)
router.use("/movchara", movchara)

module.exports = router