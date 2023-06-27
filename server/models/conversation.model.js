const mongoose = require('mongoose')
const { Schema } = mongoose

const ConversationSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    sellerId: {
        type: String,
        required: true,
    },
    buyerId: {
        type: String,
        required: true,
    },
    readBySeller: {
        type: Boolean,
        required: false,
    },
    readByBuyer: {
        type: Boolean,
        required: false,
    },
    lastMessage: {
        type: String,
        required: false,
    }
}, {
    timestamps: true
})

export default mongoose.model("Conversation", ConversationSchema)