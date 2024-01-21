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
    other_owners: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        read_permission: {
            type: Boolean,
            default: false
        },
        write_permission: {
            type: Boolean,
            default: false
        }
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model("Docs", DocsSchema)