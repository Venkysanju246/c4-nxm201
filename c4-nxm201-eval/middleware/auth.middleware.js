const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const Redis = require("ioredis");
const redis = new Redis();
const auth = async (req, res, next) => {
    const tokennew = await redis.get("RefreshToken")
   if (tokennew) {
        const decoded = jwt.verify(tokennew, "blog")
        if (decoded) {
            req.body.userid = decoded.userid
            next()
        }else{
            res.send({
                msg:"login again"
            })
        }
    }else{
        res.send({
            msg:"Login Again"
        })
    }

}
module.exports = auth

