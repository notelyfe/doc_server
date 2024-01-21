const express = require("express")
const router = express.Router()
const { createUser, login, getUser } = require("../Controllers/userController")
const verifyJWT = require("../Middleware/VerifyJwt")

router.post("/createUser", createUser)
router.post("/login", login)
router.get("/getUserData", verifyJWT, getUser)

module.exports = router