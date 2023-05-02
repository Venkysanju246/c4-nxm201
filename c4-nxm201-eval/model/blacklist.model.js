const mongoose = require("mongoose")

const iSchema = mongoose.Schema({
    ip:String
})

const blacklistModel = mongoose.model("ipApp", iSchema)

module.exports = blacklistModel