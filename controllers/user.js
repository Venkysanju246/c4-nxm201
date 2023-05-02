const express = require("express")
const ipUser = express.Router()
const bcrypt = require("bcrypt")
const UserModel = require("../model/user.model")
const jwt = require("jsonwebtoken")


const auth = require("../middleware/auth.middleware")
const Redis = require("ioredis");
const redis = new Redis();

ipUser.post("/register", (req, res) => {
    const data = req.body
    bcrypt.hash(data.password, 5, async (err, hash) => {
        const newUser = new UserModel({ name:data.name, email:data.email, password: hash })
        await newUser.save()
        res.status(200).send({
            msg: "Registeration Success"
        })
    })
   
})

ipUser.post("/login", async (req, res) => {
    const { email, password } = req.body
    const UserCheck = await UserModel.find({ email })
    if (UserCheck.length) {
        bcrypt.compare(password, UserCheck[0].password, async (err, result) => {
            if (result) {
                const refreshtoken = jwt.sign({ userid: UserCheck[0]._id }, "refresh", {
                    expiresIn: '7days'
                });
                const token = jwt.sign({ userid: UserCheck[0]._id }, "blog", {
                    expiresIn: '1h'
                });
                res.send({
                    msg: "Login Success",
                    token: token,
                    refresh: refreshtoken,
                    username: UserCheck[0].name
                })
                redis.set("AccessToken", token)
                redis.set("RefreshToken", refreshtoken)

            } else {
                res.send({
                    msg: "Login Failed"

                })
            }
        })
    }
})

ipUser.get("/getnewtoken", (req, res) => {
    const refreshtoken = req.headers.authorization
    const decoded = jwt.verify(refreshtoken, "refresh")
    if (decoded) {
        const token = jwt.sign({ userid: decoded.userid }, "blog", {
            expiresIn: '1h'
        });
        return res.send(token)
    }
    else {
        res.send("invalid refresh token, plz login again")
    }
})

ipUser.post("/logout", auth, async (req, res) => {
    const token = req.headers.authorization

    const blacklistdata = redis.set("token", token)
    // console.log("before", blacklistdata)
    await blacklistdata.save()
    res.send({
        msg: "Logout success"
    })
})

module.exports = ipUser

