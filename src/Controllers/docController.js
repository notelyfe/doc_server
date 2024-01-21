const User = require("../Models/User")
const Doc = require("../Models/Documents")

const createNewDoc = async (req, res) => {
    try {

        const { doc_name, created_by, doc_id } = req.body

        const userId = req.user.id
        const user = await User.findById({ _id: userId })

        if (!user) {
            return res.status(404).json({ msg: "User Not Found" })
        }

        const doc = await Doc.create({
            doc_name: doc_name,
            created_by: created_by,
            doc_id: doc_id,
            owners: null,
        })

        res.status(200).json(doc)

    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error" })
    }
}

module.exports = {
    createNewDoc
}