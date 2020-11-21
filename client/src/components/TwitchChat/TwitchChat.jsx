import React, {useEffect, useState} from 'react';
import * as Styles from './TwitchChat.module.css';

const messages = [];
const TwitchChat = ({message, startTwitchParsing}) =>{
    useEffect(()=>{
        console.log(message);
        const elemMessage = <div>{message}</div>;
        messages.push(elemMessage);
    })

return <div className={Styles.wrapper}>
            <div className={Styles.chat}>
                {messages.map((elem)=>(elem))}
            </div>
            <div className={Styles.buttonArea}>
                <button className={Styles.button} onClick={startTwitchParsing}>Старт</button>
            </div>
        </div>
}

export default TwitchChat;