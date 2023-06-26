const express = require('express')
const { deleteUser } = require('../controllers/user.controller')
const router = express.Router()

router.get('/test',deleteUser)

module.exports = router