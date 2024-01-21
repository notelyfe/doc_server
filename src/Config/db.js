const mongoose = require("mongoose")

const uri = process.env.URI

const connectToDb = () => {
    mongoose.connect(uri)
}

module.exports = connectToDb