const app = require("express")()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
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


app.listen(8000, () => {
    connect()
    console.log('server running at port 8000')
})