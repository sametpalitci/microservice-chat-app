const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    userId:{
        type:Number,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    roomId:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Chat',chatSchema);
