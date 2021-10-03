const express = require("express")
const app = express()
const cors = require('cors')
const multer= require('multer')
const cloudinary = require("multer-storage-cloudinary");
const form = multer()
// const form1 = cloudinary()

// const input = require('./data.json')
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())
app.use(form.array())
// app.use(form1.array())
app.get("/", (req,res)=>{
    res.json({
        message:"server running",
        serverTime: new Date()
    })
})
app.use("/api", require("./routes/index"))
// app.get("/players", (req,res)=>{
//     res.send(input)
// })

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})