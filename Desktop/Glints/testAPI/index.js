const express = require("express")
const app = express()
const router= require('./routes')

const input = require('./data.json')
let port = process.env.PORT || 5432;

app.use(express.json())
// app.get("/", (req,res)=>{
//     res.send("hello World")
// })
app.use('/api', router)
app.get("/players", (req,res)=>{
    res.send(input)
})

app.listen(port, ()=>{
    console.log(`server runing on port ${port}`)
})