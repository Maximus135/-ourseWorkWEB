import io_r from 'socket.io';
import http from 'http';
import express from 'express';
import {TwitchParser} from './API/TwitchParser';

const app = express();
const server = http.createServer(app);
const io = io_r(server);
let connections = [];



io.on('connection', (socket) =>{
    connections.push(socket);
    console.log('connected');
    socket.on('startTwitchParser' , start=>{
        const getTwitchMesage = (message)=>{
            socket.emit('newMessageFromTwitch', {message: message});
        }
        TwitchParser('ybicanoooobov', 'привет', getTwitchMesage);
    })
    socket.on('disconnect',(socket) => {
        connections.splice(connections.indexOf(socket), 1);
        console.log('disconnected');
    });
})


app.get('/', (req, res)=>{
    res.send('');
})

server.listen(4000,() => { 
    console.log(`app is listening to port 4000`); 
})