const User = require("../Models/User")
const Doc = require("../Models/Documents")

const createNewDoc = async (req, res) => {
    try {

        const userId = req.user.id
        const user = await User.findById({ _id: userId })

        if (!user) {
            return res.status(401).json({ msg: "UnAuthroized" })
        }

        const doc = await Doc.create({
            doc_name: "untitled",
            created_by: user._id,
            other_owners: null,
        })

        res.status(200).json(doc)

    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error" })
    }
}

const getAllDocs = async (req, res) => {
    try {

        const userId = req.user.id
        const user = await User.findById({ _id: userId })

        if (!user) {
            return res.status(401).json({ msg: "UnAuthroized" })
        }

        const docs = await Doc.find({ created_by: userId })

        res.status(200).json(docs)

    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error" })
    }
}

module.exports = {
    createNewDoc,
    getAllDocs
}