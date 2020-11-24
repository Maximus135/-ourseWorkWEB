import io_r from 'socket.io';
import http from 'http';
import express from 'express';
import {TwitchParser} from './API/TwitchParser';
import {YoutubeParser} from './API/YoutubeParser';

const app = express();
const server = http.createServer(app);
const io = io_r(server);
let connections = [];



io.on('connection', (socket) =>{
    connections.push(socket);
    console.log('connected');
    socket.once('startTwitchParser' , start => {
        const getTwitchMessage = (user, message)=>{
            socket.emit('newMessageFromTwitch', {user: user, message: message});
        }
        TwitchParser(start.nickName, start.keyWord, getTwitchMessage);
    })
    socket.on('stopTwitchParser', stop => {
        TwitchParser('', '', undefined, false);
    })

    socket.once('startYoutubeParser' , start => {
        const getYoutubeMessage = (user, message)=>{
            socket.emit('newMessageFromYoutube', {user: user, message: message});
        }
        YoutubeParser(start.streamKey, start.keyWord, getYoutubeMessage);
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