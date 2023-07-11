const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middleware/jwt')
const { getOrders, intent ,confirm} = require('../controllers/order.controller')
router.get('/', verifyToken, getOrders)
router.post('/create-payment-intent/:id', verifyToken, intent)
router.put('/', verifyToken, confirm)

module.exports = router