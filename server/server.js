//import
const app = require("express")()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoutes = require('./routes/user.routes')

//init
dotenv.config()

mongoose.set('strictQuery', true)
const connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('connected to mongoDB !')
      } catch (error) {
        handleError(error);
      }
}

//routes
app.use('/api/users',userRoutes)


//spin server

app.listen(8000, () => {
    connect()
    console.log('server running at port 8000')
})