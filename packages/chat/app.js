require('dotenv').config({path: '../../.env'});
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');
const mongoose = require('mongoose');

const Chat = require('./models/ChatSchema');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));



io.on('connection', (socket) => {

    socket.on('loadAllMessages',async ({room})=>{
        const findMessagesToRoom = await Chat.find({}).where('roomId', Number(room));
        if (findMessagesToRoom) {
            const storeMessage = [];
            findMessagesToRoom.map((dbContext, index) => {
                const payloadContext = {
                    name: dbContext.userName,
                    room: String(dbContext.roomId),
                    message: dbContext.message,
                    userId: dbContext.userId
                };
                storeMessage.push(payloadContext);
            });
            io.in(String(room)).emit('loadAllMessage', storeMessage);
        }
    });

    socket.on('loginRoom', async ({room}) => {
        socket.join(room);
    });
    socket.on('leaveRoom', ({room}) => {
        socket.leave(room);
    });
    socket.on('sendMessage', (payload) => {
        io.in(payload.room).emit('message', payload);

        Chat.create({
            userId: payload.userId,
            userName: payload.name,
            roomId: payload.room,
            message: payload.message
        }, (err, success) => {
            if (err) {
                console.log(err);
            }
        })
    });
});

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    http.listen(process.env.API_CHAT_PORT, () => {
        console.log(`App is listening PORT : ${process.env.API_CHAT_PORT}`)
    })
}).catch((e) => {
    console.log(e)
})

