require("dotenv").config()
const express = require("express")
const app = express()
const connectToDb = require("./src/Config/db")
const cors = require("cors")
const socketConnection = require("./src/Socket/socket")
const corsOptions = require("./src/Config/corsOptions")
const cookieParser = require("cookie-parser")
const credentials = require("./src/Middleware/credentials")

const port = process.env.PORT

app.use(credentials)
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", require("./src/Routes/user"))
app.use("/api/refresh", require("./src/Routes/refresh"))
app.use("/api/logout", require("./src/Routes/logout"))
app.use("/api/doc", require("./src/Routes/doc"))

const server = app.listen(port, () => {
    console.log(`Server is Running on port ${port}`)
})

socketConnection(server)

app.get("*", (req, res) => {
    res.status(404).json({ msg: "404 Page Not found" })
})

connectToDb()