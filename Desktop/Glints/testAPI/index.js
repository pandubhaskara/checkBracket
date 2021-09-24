const express = require("express")
const app = express()
const input = require('./data.json')
let port = process.env.PORT || 3000;

app.get("/", (req,res)=>{
    res.send("hello World")
})

app.get("/players", (req,res)=>{
    res.send(input)
})

app.listen(port, ()=>{
    console.log(`server runing on port ${port}`)
})