import React, {useEffect, useRef, useState} from 'react';
import * as Styles from './YoutubeChat.module.css'
import {ReactComponent as YotubeLogo} from '../../Images/youtubeLogo.svg';

const YoutubeChat = props => {

    const messagesEndRef = useRef(null);
    const Vlink = useRef(null);
    const keyWord = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    return <div className={Styles.wrapper}>
            <YotubeLogo className={Styles.logo} />
            <div className={Styles.chat}>

                <div ref={messagesEndRef} />
            </div>
            <div className={Styles.buttonArea}>
                <div className={Styles.inputs}>
                    <input ref={Vlink} className={Styles.inputName} placeholder='Stream Key'></input>
                    <input ref={keyWord} className={Styles.inputKeyWord} placeholder='KeyWord'></input>
                </div>
            <button className={Styles.buttonYoutube}>Start</button>
            </div>
        </div>
}

export default YoutubeChat;