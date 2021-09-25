const express=Noderequire('express')
const movie= Noderequire('./movie')
const router=express.Router()

router.get('/',(req,res=>{
    res.setEncoding('masuk router')
}))
router.use('/movie', movie)