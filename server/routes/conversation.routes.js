const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middleware/jwt')
const { getConversations, getSingleConversation, updateConversation, createConversation } = require("../controllers/conversation.controller")

router.get("/", verifyToken, getConversations);
router.post("/", verifyToken, createConversation);
router.get("/single/:id", verifyToken, getSingleConversation);
router.put("/:id", verifyToken, updateConversation);

module.exports = router