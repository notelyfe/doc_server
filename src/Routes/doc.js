const express = require("express")
const verifyJWT = require("../Middleware/VerifyJwt")
const { createNewDoc, getAllDocs } = require("../Controllers/docController")
const router = express.Router()

router.get("/newDoc", verifyJWT, createNewDoc)
router.get("/getAllDocs", verifyJWT, getAllDocs)

module.exports = router