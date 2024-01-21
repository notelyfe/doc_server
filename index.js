require("dotenv").config()
const express = require("express")
const app = express()
const connectToDb = require("./src/Config/db")
const cors = require("cors")

const port = process.env.PORT

app.use(cors())
app.use(express.json())

app.use("/api/auth", require("./src/Routes/user"))

app.get("*", (req, res) => {
    res.status(404).json({ msg: "404 Page Not found" })
})

const server = app.listen(port, () => {
    console.log(`Server is Running on port ${port}`)
})

connectToDb()