const mongoose = require("mongoose")
const { Schema } = mongoose;

const DocsSchema = new Schema({
    name: {
        type: String
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Docs", DocsSchema)