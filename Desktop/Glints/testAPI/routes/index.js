const express = require("express")
const movie= require('./movie')
const character=require('./character')
const movchara=require('./movie_character')
const review=require('./review')
const user = require('./user')
const movgenre =require('./movie_genre')


const router= express.Router()

router.get('/',(req,res)=>{
    res.send('masuk router')
})
router.use('/movie', movie)
router.use('/character', character)
router.use("/movchara", movchara)
router.use("/movgenre", movgenre)
router.use('/review', review)
router.use('/user', user)

module.exports = router