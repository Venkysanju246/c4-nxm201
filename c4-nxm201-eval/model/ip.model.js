const mongoose = require("mongoose")

const iSchema = mongoose.Schema({
    ip:String
})

const ipModel = mongoose.model("ipApp", iSchema)

module.exports = ipModel