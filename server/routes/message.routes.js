const express = require('express')
const router = express.Router()
const {createMessage,getMessages} = require('../controllers/message.controller')
const { verifyToken } = require('../middleware/jwt')

router.post('/', verifyToken, createMessage)
router.get('/:id', verifyToken, getMessages)

module.exports = router