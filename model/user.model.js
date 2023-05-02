const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,

    },
    email: {
        type: String,
   
    },
    password: {
        type: String,
       
    }
})

const UserModel = mongoose.model("bloguserip", userSchema)

module.exports = UserModel