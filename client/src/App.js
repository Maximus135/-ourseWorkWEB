import React, {useEffect, useState} from 'react';
import './App.css';
import io from 'socket.io-client';
import TwitchChat from './components/TwitchChat/TwitchChat'

const socket = io.connect('http://localhost:4000');

const App = () =>{
  const [twitchMessage, addTwitchMessage] = useState({});
  const startTwitchParsing = () =>{
    socket.emit('startTwitchParser', {});
  }

  useEffect(()=>{
    socket.on('connect', socket =>{
      console.log('connected');
    });
    socket.on('newMessageFromTwitch', socket=>{
      addTwitchMessage(socket);
    });
  })


  return(
    <div className='App'>
        <TwitchChat message={twitchMessage.message} startTwitchParsing={startTwitchParsing}></TwitchChat>
    </div>
  )
}

export default App;
