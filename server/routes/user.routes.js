const express = require('express')
const router = express.Router()
const { deleteUser } = require('../controllers/user.controller')
const { verifyToken } = require('../middleware/jwt')

router.delete('/:id', verifyToken, deleteUser)

module.exports = router