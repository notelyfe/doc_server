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
            other_owners: [],
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
        const shared = await Doc.find()
        const newShared = []

        for(let i=0; i<shared.length; i++){
            for(let j=0; j<shared[i]?.other_owners?.length; j++){
                if(shared[i]?.other_owners[j]?.user?.toString() === user?._id.toString()){
                    newShared.push(shared[i])
                }
            }
        }

        const allDocs = {
            docs, newShared
        }

        res.status(200).json(allDocs)

    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error" })
    }
}

const shareDoc = async (req, res) => {
    try {

        const { doc_id, share_to } = req.body

        const usrId = req.user.id
        const user = await User.findById({ _id: usrId })

        if (!user) {
            return res.status(404).json({ msg: "Invalid User" })
        }

        const doc = await Doc.findById({ _id: doc_id })

        if (doc?.created_by.toString() !== user?._id.toString()) {
            return res.status(403).json({ msg: "Action not Allowed" })
        }

        let existedOwerns = []
        for(let k=0; k<doc?.other_owners?.length; k++){
            existedOwerns.push(doc?.other_owners[k]?.user.toString())
        }

        let new_owners = doc?.other_owners
        for (let i = 0; i < share_to.length; i++) {

            let sharedUserId = await User.findOne({ email: share_to[i]?.email })

            if(!existedOwerns.includes(sharedUserId?._id.toString())){
                data = {
                    user: sharedUserId?._id,
                    write_permission: share_to[i]?.permission
                }
                new_owners.push(data)
            }
        }

        await Doc.findByIdAndUpdate({ _id: doc?._id }, {other_owners: new_owners})

        res.status(200).json({msg: "Docs Shared"})

    } catch (error) {
        res.json(error)
    }
}

module.exports = {
    createNewDoc,
    getAllDocs,
    shareDoc
}