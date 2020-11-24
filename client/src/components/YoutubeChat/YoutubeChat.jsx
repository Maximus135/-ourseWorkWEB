import React, {useEffect, useRef, useState} from 'react';
import * as Styles from './YoutubeChat.module.css'
import {ReactComponent as YoutubeLogo} from '../../Images/youtubeLogo.svg';
import YoutubeMessage from '../YoutubeMessage/YoutubeMessage';

const youtubeMessages = []

const YoutubeChat = ({message, user, startYoutubeParsing}) => {

    const [startStop, setStartStop] = useState(true);

    const messagesYoutubeEndRef = useRef(null);
    const Vlink = useRef(null);
    const keyWord = useRef(null);

    const buttonClickStart = () => {
        youtubeMessages.length = 0; // подумать на счет этого
        if (Vlink.current.value !== '') {
            startYoutubeParsing(Vlink.current.value, keyWord.current.value);
            setStartStop(!startStop);
        } else {
            alert('Insert channel Vlink!')
        }
    }

    useEffect(() => {
        if (message !== undefined && user !== undefined && !startStop) {
            youtubeMessages.push(<YoutubeMessage message={message} user={user}/>);
        }
        if (youtubeMessages.length === 50) {
            youtubeMessages.shift();
        }
        messagesYoutubeEndRef.current.scrollIntoView({behavior: "smooth"})
    }, [messagesYoutubeEndRef, message, user, youtubeMessages])

    return <div className={Styles.wrapper}>
        <YoutubeLogo className={Styles.logo}/>
        <div className={Styles.chat}>
            {youtubeMessages.map((elem) => (elem))}
            <div ref={messagesYoutubeEndRef}/>
        </div>
        <div className={Styles.buttonArea}>
            <div className={Styles.inputs}>
                <input ref={Vlink} className={Styles.inputName} placeholder='Stream Key'/>
                <input ref={keyWord} className={Styles.inputKeyWord} placeholder='KeyWord'/>
            </div>
            <button className={Styles.buttonYoutube} onClick={buttonClickStart}>Start</button>
        </div>
    </div>
}

export default YoutubeChat;