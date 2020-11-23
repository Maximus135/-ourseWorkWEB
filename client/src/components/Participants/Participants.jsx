import React, {useEffect, useRef, useState} from 'react';
import * as Styles from './Participants.module.css'

const Participants = props => {

    const usersEndRef = useRef(null);

    const scrollToBottom = () => {
        usersEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    return <div className={Styles.wrapper}>

            <div className={Styles.users}>

                <div ref={usersEndRef} />
            </div>
            <div className={Styles.buttonArea}>
                <div className={Styles.inputs}>

                </div>
            <button className={Styles.buttonTwitch}>roll</button>
            </div>
        </div>
}

export default Participants;