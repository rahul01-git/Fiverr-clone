//import
const express = require("express")
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoutes = require('./routes/user.routes')
const conversationRoutes = require('./routes/conversation.routes')
const gigRoutes = require('./routes/gig.routes')
const messageRoutes = require('./routes/message.routes')
const orderRoutes = require('./routes/order.routes')
const reviewRoutes = require('./routes/review.routes')
const  authRoutes= require('./routes/auth.routes')

//init
dotenv.config()
const app = express()
app.use(express.json())
mongoose.set('strictQuery', true)
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('connected to mongoDB !')
  } catch (error) {
    console.log(error);
  }
}

//routes
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/conversations', conversationRoutes)
app.use('/api/gigs', gigRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/reviews', reviewRoutes)


//spin server

app.listen(8000, () => {
  connect()
  console.log('server running at port 8000')
})