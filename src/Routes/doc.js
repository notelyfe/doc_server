const express = require("express")
const verifyJWT = require("../Middleware/VerifyJwt")
const { createNewDoc } = require("../Controllers/docController")
const router = express.Router()

router.post("/newDoc", verifyJWT, createNewDoc)

module.exports = router