require('dotenv').config({path: '../../.env'});
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

io.on('connection', (socket) => {
    socket.on('loginRoom', ({room}) => {
        console.log('loginRoom ', room)
        socket.join(room);
    });
    socket.on('leaveRoom', ({room}) => {
        console.log('leaveRoom ', room)
        socket.leave(room);
    });
    socket.on('sendMessage', (payload) => {
        console.log(payload);
        io.in(payload.room).emit('message', payload);
    });
});


http.listen(process.env.API_CHAT_PORT, () => {
    console.log(`App is listening PORT : ${process.env.API_CHAT_PORT}`)
})