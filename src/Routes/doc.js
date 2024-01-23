const express = require("express")
const verifyJWT = require("../Middleware/VerifyJwt")
const { createNewDoc, getAllDocs, shareDoc, deleteDoc, editName } = require("../Controllers/docController")
const router = express.Router()

router.get("/newDoc", verifyJWT, createNewDoc)
router.get("/getAllDocs", verifyJWT, getAllDocs)
router.post("/shareDoc", verifyJWT, shareDoc)
router.put("/editName", verifyJWT, editName)
router.delete("/deleteDoc/:id", verifyJWT, deleteDoc)

module.exports = router