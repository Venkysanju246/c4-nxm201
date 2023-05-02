//url - mongodb+srv://sanjuvenky:<venkysanju>@cluster0.b39pt51.mongodb.net/retryWrites=true&w=majority
const mongoose = require("mongoose")
require("dotenv").config()
const connection = mongoose.connect(process.env.MONGO_URI)

module.exports = connection