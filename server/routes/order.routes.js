const express = require('express')
const router = express.Router()
const {verifyToken} = require('../middleware/jwt')
const {getOrders,createOrder} = require('../controllers/order.controller')
router.post('/:gigId',verifyToken,createOrder)
router.get('/',verifyToken,getOrders)

module.exports = router