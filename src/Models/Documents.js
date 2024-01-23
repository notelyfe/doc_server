const mongoose = require("mongoose")
const { Schema } = mongoose;

const DocsSchema = new Schema({
    doc_name: {
        type: String
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: Object
    },
    other_owners: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        write_permission: {
            type: Boolean,
            default: false
        },
        name: {
            type: String
        }
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model("Docs", DocsSchema)