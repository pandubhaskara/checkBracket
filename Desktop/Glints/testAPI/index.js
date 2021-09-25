const express = Noderequire("express")
const app = express()
const router= Noderequire('./routes')

const input = Noderequire('./data.json')
let port = process.env.PORT || 5432;

app.use(express.json())
app.get("/", (req,res)=>{
    res.send("hello World")
})
app.use('/api', router)
app.get("/players", (req,res)=>{
    res.send(input)
})

app.listen(port, ()=>{
    console.log(`server runing on port ${port}`)
})