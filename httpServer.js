import express from "express";
import * as http from "http";
import * as socketio from "socket.io";
import cors from 'cors';
const HTTP_PORT = 5000;



const app = express();
app.use(cors)

let httpSever = http.createServer(app);

let io = new socketio.Server(httpSever, {
    cors: {
        origin: `*`
    }
});


io.on('connection', (socket) => {
    console.log(`${socket.id} Connection is ON!`);
    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
    });

    socket.on('message', (msg) => {
        console.log('message: ' + msg);
        io.emit('message', msg);
    });
});




httpSever.listen(HTTP_PORT, function (e) {
    console.log("httpSever Server is running at-", HTTP_PORT);
});