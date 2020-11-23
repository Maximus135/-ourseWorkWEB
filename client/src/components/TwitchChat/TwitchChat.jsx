import React, {useEffect, useRef, useState} from 'react';
import TwitchMessage from '../TwitchMessage/TwitchMessage';
import * as Styles from './TwitchChat.module.css';
import {ReactComponent as TwitchLogo} from '../../Images/twitchLogo.svg';

const messages = [];
const TwitchChat = ({message, user, startTwitchParsing, stopTwitchParsing}) =>{

    const [startStop, setStartStop] = useState(true);
    const buttonClickStart = () => {
        messages.length = 0; // подумать на счет этого
        if(nickName.current.value !== ''){
            startTwitchParsing(nickName.current.value, keyWord.current.value);
            setStartStop(!startStop);
        }else{
            alert('Insert channel NickName!')
        }
    }

    const buttonClickStop = () => {
        stopTwitchParsing();
        messages.length = 0; // подумать на счет этого
        setStartStop(!startStop);
    } 
    const messagesEndRef = useRef(null);
    const nickName = useRef(null);
    const keyWord = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(()=>{
        // console.log(user); // почему-то проблемы с 1 сообщением 
        if(message !== undefined && user['display-name'] !== undefined && !startStop){
        messages.push( <TwitchMessage message={message} user={user['display-name']} /> );
        }
        if(messages.length === 50){
            messages.shift();
        }
        scrollToBottom();
    })

return <div className={Styles.wrapper}>
            <TwitchLogo className={Styles.logo}/>
            <div className={Styles.chat}>
                {messages.map((elem)=>(elem))}
                <div ref={messagesEndRef} />
            </div>
            <div className={Styles.buttonArea}>
                <div className={Styles.inputs}>
                    <input ref={nickName} className={Styles.inputName} placeholder='Twitch NickName'></input>
                    <input ref={keyWord} className={Styles.inputKeyWord} placeholder='KeyWord'></input>
                </div>
            <button className={Styles.buttonTwitch} onClick={startStop ? buttonClickStart : buttonClickStop}>{startStop? 'Start' : 'Stop'}</button>
            </div>
        </div>
}

export default TwitchChat;