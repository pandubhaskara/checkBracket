const express = require("express")
const app = express()


// const input = require('./data.json')
let port = process.env.PORT || 5000;

app.use(express.json())
app.get("/", (req,res)=>{
    res.send("hello World")
})
app.use("/api", require("./routes/index"))
// app.get("/players", (req,res)=>{
//     res.send(input)
// })

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})