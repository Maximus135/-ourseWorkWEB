import React, {useEffect, useState} from 'react';
import './App.css';
import io from 'socket.io-client';
import TwitchChat from './components/TwitchChat/TwitchChat'
import Participants from './components/Participants/Participants';
import YoutubeChat from './components/YoutubeChat/YoutubeChat';

const socket = io.connect('http://localhost:4000');

const App = () =>{

  const [twitchMessage, addTwitchMessage] = useState({});

  const startTwitchParsing = (nickName, keyWord) =>{
    socket.emit('startTwitchParser', {nickName: nickName, keyWord: keyWord});
  }

  const stopTwitchParsing = () =>{
    socket.emit('stopTwitchParser', {});
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
        <TwitchChat 
          message={twitchMessage.message} 
          user={twitchMessage.user} 
          startTwitchParsing={startTwitchParsing} 
          stopTwitchParsing={stopTwitchParsing}>
        </TwitchChat>
        <Participants>
        </Participants>
        <YoutubeChat>
          
        </YoutubeChat>
    </div>
  )
}

export default App;
