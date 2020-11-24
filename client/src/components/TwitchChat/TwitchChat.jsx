import React, {useEffect, useRef, useState} from 'react';
import TwitchMessage from '../TwitchMessage/TwitchMessage';
import * as Styles from './TwitchChat.module.css';
import {ReactComponent as TwitchLogo} from '../../Images/twitchLogo.svg';

const twitchMessages = [];

const TwitchChat = ({message, user, startTwitchParsing, stopTwitchParsing}) => {

    const [startStop, setStartStop] = useState(true);
    const buttonClickStart = () => {
        twitchMessages.length = 0; // подумать на счет этого
        if (nickName.current.value !== '') {
            startTwitchParsing(nickName.current.value, keyWord.current.value);
            setStartStop(!startStop);
        } else {
            alert('Insert channel NickName!')
        }
    }

    const buttonClickStop = () => {
        stopTwitchParsing();
        twitchMessages.length = 0; // подумать на счет этого
        setStartStop(!startStop);
    }
    const messagesTwitchEndRef = useRef(null);
    const nickName = useRef(null);
    const keyWord = useRef(null);

    useEffect(() => {
        // console.log(user); // почему-то проблемы с 1 сообщением 
        if (message !== undefined && user['display-name'] !== undefined && !startStop) {
            twitchMessages.push(<TwitchMessage message={message} user={user['display-name']}/>);
        }
        if (twitchMessages.length === 50) {
            twitchMessages.shift();
        }
        messagesTwitchEndRef.current.scrollIntoView({behavior: "smooth"})
    }, [messagesTwitchEndRef, message, user, twitchMessages])

    return <div className={Styles.wrapper}>
        <TwitchLogo className={Styles.logo}/>
        <div className={Styles.chat}>
            {twitchMessages.map((elem) => (elem))}
            <div ref={messagesTwitchEndRef}/>
        </div>
        <div className={Styles.buttonArea}>
            <div className={Styles.inputs}>
                <input ref={nickName} className={Styles.inputName} placeholder='Twitch NickName'/>
                <input ref={keyWord} className={Styles.inputKeyWord} placeholder='KeyWord'/>
            </div>
            <button className={Styles.buttonTwitch}
                    onClick={startStop ? buttonClickStart : buttonClickStop}>{startStop ? 'Start' : 'Stop'}</button>
        </div>
    </div>
}

export default TwitchChat;