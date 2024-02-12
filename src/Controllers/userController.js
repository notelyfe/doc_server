const User = require("../Models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const accessToken = process.env.ACCESS_TOKEN_SECRET
const refreshToken = process.env.REFRESH_TOKEN_SECRET

const createUser = async (req, res) => {

    try {

        let { name, email, password } = req.body

        let user = await User.findOne({ email: email })

        if (user) {
            return res.status(400).json({ message: `User with ${email} already exist` })
        }

        const salt = await bcrypt.genSalt(10)
        const securePass = await bcrypt.hash(password, salt)

        user = await User.create({
            name: name,
            email: email,
            password: securePass
        })

        res.status(200).json({ message: "User Created Successfully" })

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }

}

const login = async (req, res) => {

    try {

        let { email, password } = req.body

        let user = await User.findOne({ email: email })

        if (!user) {
            return res.status(404).json({ message: `${email} doesn't exist` })
        }

        let passCompare = await bcrypt.compare(password, user.password)

        if (!passCompare) {
            return res.status(400).json({ message: "Invalid Password" })
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const access_token = jwt.sign(data, accessToken, { expiresIn: "30m" })
        const refresh_token = jwt.sign(data, refreshToken, { expiresIn: "24h" })
        res.cookies("jwt", refresh_token, { httpOnly: true, sameSite: "None", secure: true, maxAge: 24 * 60 * 60 * 1000 })
        res.status(200).json({ access_token })

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
        console.log(error)
    }

}

const getUser = async (req, res) => {

    try {

        const userId = req.user.id
        const user = await User.findById(userId).select(['-password'])
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }

}

module.exports = {
    createUser,
    login,
    getUser
}