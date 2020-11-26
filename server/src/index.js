import io_r from 'socket.io';
import http from 'http';
import express from 'express';
import { TwitchParser } from './API/TwitchParser';
import { YoutubeParser } from './API/YoutubeParser';

const app = express();
const server = http.createServer(app);
const io = io_r(server);
let connections = [];



io.on('connection', (socket) => {
    connections.push(socket);
    console.log('connected');
    socket.on('startTwitchParser', start => {
        const getTwitchMessage = (user, message, wordFlag) => {
            if (wordFlag === true) {
                socket.emit('newMessageFromTwitch', { user: user, message: message, wordFlag: wordFlag });
            } else {
                socket.emit('newMessageFromTwitch', { user: user, message: message });
            }
        }
        TwitchParser(start.nickName, start.keyWord, getTwitchMessage);
    })
    socket.on('stopTwitchParser', stop => {
        TwitchParser('', '', undefined, false);
    })

    socket.on('startYoutubeParser', start => {
        const getYoutubeMessage = (user, message, wordFlag) => {
            if (wordFlag === true) {
                socket.emit('newMessageFromYoutube', { user: user, message: message, wordFlag: wordFlag });
            } else {
                socket.emit('newMessageFromYoutube', { user: user, message: message });
            }
        }
        YoutubeParser(start.streamKey, start.keyWord, getYoutubeMessage, true);
    })

    socket.on('stopYoutubeParser', stop => {
        YoutubeParser('', '', undefined, false);
    })

    socket.on('disconnect', (socket) => {
        connections.splice(connections.indexOf(socket), 1);
        console.log('disconnected');
    });
})


app.get('/', (req, res) => {
    res.send('');
})

server.listen(4000, () => {
    console.log(`app is listening to port 4000`);
})