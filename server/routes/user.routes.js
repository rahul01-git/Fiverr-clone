const express = require('express')
const router = express.Router()
const { deleteUser,getUser } = require('../controllers/user.controller')
const { verifyToken } = require('../middleware/jwt')

router.delete('/:id', verifyToken, deleteUser)
router.get('/:id', getUser)

module.exports = router