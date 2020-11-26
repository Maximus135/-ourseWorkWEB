import React, { useEffect, useRef, useState } from 'react';
import * as Styles from './YoutubeChat.module.css'
import { ReactComponent as YotubeLogo } from '../../Images/youtubeLogo.svg';
import YoutubeMessage from '../YoutubeMessage/YoutubeMessage';

const youtubeMessages = []

const YoutubeChat = ({ message, user, startYoutubeParsing, stopYoutubeParsing }) => {

    const [startStop, setStartStop] = useState(true);
    const messagesYoutubeEndRef = useRef(null);
    const Vlink = useRef(null);
    const keyWord = useRef(null);

    const buttonClickStart = () => {
        youtubeMessages.length = 0;
        if (Vlink.current.value !== '') {
            startYoutubeParsing(Vlink.current.value, keyWord.current.value);
            setStartStop(!startStop);
        } else {
            alert('Insert channel Vlink!')
        }
    }

    const buttonClickStop = () => {
        stopYoutubeParsing();
        youtubeMessages.length = 0;
        setStartStop(!startStop);
    }

    useEffect(() => {
        if (message !== undefined && user !== undefined && !startStop) {
            youtubeMessages.push(<YoutubeMessage message={message} user={user} />);
        }
        if (youtubeMessages.length === 50) {
            youtubeMessages.shift();
        }
        messagesYoutubeEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messagesYoutubeEndRef, message, user, startStop])

    return <div className={Styles.wrapper}>
        <YotubeLogo className={Styles.logo} />
        <div className={Styles.chat}>
            {youtubeMessages.map((elem) => (elem))}
            <div ref={messagesYoutubeEndRef} />
        </div>
        <div className={Styles.buttonArea}>
            <div className={Styles.inputs}>
                <input ref={Vlink} className={Styles.inputName} placeholder='Stream Key'></input>
                <input ref={keyWord} className={Styles.inputKeyWord} placeholder='KeyWord'></input>
            </div>
            <button className={Styles.buttonYoutube} onClick={startStop ? buttonClickStart : buttonClickStop}>{startStop ? 'Start' : 'Stop'}</button>
        </div>
    </div>
}

export default YoutubeChat;