const mongoose = require('mongoose')
const {Schema} = mongoose

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    desc: {
        type: String,
        required: false,
    },
    isSeller: {
        type: Boolean,
        default: false,
    },
},{
    timeStamps: true
})

export default mongoose.model("User",UserSchema)