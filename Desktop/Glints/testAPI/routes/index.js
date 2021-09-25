const express=require('express')
const movie= require('./movie')
const router=express.Router()

router.get('/',(req,res)=>{
    res.send('masuk router')
})
router.use('/movie', movie)

module.exports = router