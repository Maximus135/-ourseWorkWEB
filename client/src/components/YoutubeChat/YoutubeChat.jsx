import React, {useEffect, useRef, useState} from 'react';
import * as Styles from './YoutubeChat.module.css'
import {ReactComponent as YotubeLogo} from '../../Images/youtubeLogo.svg';
import YoutubeMessage from '../YoutubeMessage/YoutubeMessage';

const youtubeMessages = []

const YoutubeChat =  ({message, user, startYoutubeParsing, stoptYoutubeParsing}) => {

    const [startStop, setStartStop] = useState(true);

    const messagesYoutubeEndRef = useRef(null);
    const Vlink = useRef(null);
    const keyWord = useRef(null);

    const buttonClickStart = () => {
        youtubeMessages.length = 0; // подумать на счет этого
        if(Vlink.current.value !== ''){
            startYoutubeParsing(Vlink.current.value, keyWord.current.value);
            setStartStop(!startStop);
        }else{
            alert('Insert channel Vlink!')
        }
    }

    const buttonClickStop = () => {
        stoptYoutubeParsing();
        youtubeMessages.length = 0; // подумать на счет этого
        setStartStop(!startStop);
    } 

    const scrollToBottom = () => {
        messagesYoutubeEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(()=>{
        if(message !== undefined && user !== undefined && !startStop){
            youtubeMessages.push( <YoutubeMessage message={message} user={user} /> );
        }
        if(youtubeMessages.length === 50){
            youtubeMessages.shift();
        }
        scrollToBottom();
    },[scrollToBottom])

    return <div className={Styles.wrapper}>
            <YotubeLogo className={Styles.logo} />
            <div className={Styles.chat}>
                {youtubeMessages.map((elem)=>(elem))}
                <div ref={messagesYoutubeEndRef} />
            </div>
            <div className={Styles.buttonArea}>
                <div className={Styles.inputs}>
                    <input ref={Vlink} className={Styles.inputName} placeholder='Stream Key'></input>
                    <input ref={keyWord} className={Styles.inputKeyWord} placeholder='KeyWord'></input>
                </div>
            <button className={Styles.buttonYoutube} onClick={buttonClickStart}>Start</button>
            </div>
        </div>
}

export default YoutubeChat;