const express = require("express")
const ipRoute = require("./controllers/ip.controller")
const ipUser = require("./controllers/user")
const app = express()
app.use(express.json())

app.use("/ip",ipRoute)
app.use("/user", ipUser)

app.listen(8080, ()=>{
    console.log("server started")
})
