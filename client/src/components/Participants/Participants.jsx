import React, { useEffect, useRef, useState } from 'react';
import * as Styles from './Participants.module.css'
import YoutubeMessage from '../YoutubeMessage/YoutubeMessage';
import TwitchMessage from '../TwitchMessage/TwitchMessage';
import { ReactComponent as Close } from '../../Images/close.svg';
import { ReactComponent as ParticipantsLogo } from '../../Images/participants.svg';

const users = [];
const usersCheck = [];

const Participants = ({ platform, user, stopTwitchParsing, stopYoutubeParsing }) => {

    const usersEndRef = useRef(null);
    const [roll, setRoll] = useState(true);

    const buttonClickRoll = () => {
        setRoll(false);
        stopTwitchParsing();
        stopYoutubeParsing();
        const winner = Math.floor(Math.random() * usersCheck.length);
        alert('Winner is :' + usersCheck[winner]);
    }

    const buttonClickReRoll = () => {
        const winner = Math.floor(Math.random() * usersCheck.length);
        alert('Winner is :' + usersCheck[winner]);
    }

    const clearUsers = () => {
        users.length = 0;
        setRoll(true);
    }

    useEffect(() => {
        if (user !== undefined && platform !== undefined) {
            if (platform === 'twitch') {
                if (!usersCheck.includes(user['display-name'])) {
                    usersCheck.push(user['display-name']);
                    users.push(<TwitchMessage user={user['display-name']} />);
                }
            } else {
                if (!usersCheck.includes(user)) {
                    usersCheck.push(user);
                    users.push(<YoutubeMessage user={user} />);
                }
            }
        }
        usersEndRef.current.scrollIntoView({ behavior: "smooth" });

    }, [usersEndRef, platform, user])

    return <div className={Styles.wrapper}>
        <ParticipantsLogo className={Styles.logo} />
        <div className={Styles.users}>
            {users.map((elem) => (elem))}
            <div ref={usersEndRef} />
        </div>
        <div className={Styles.buttonArea}>
            {!roll ? <Close className={Styles.closeIcon} onClick={clearUsers} /> : ''}
            <button className={Styles.buttonParticipants} onClick={roll ? buttonClickRoll : buttonClickReRoll}>{roll ? 'Roll' : 'Reroll'}</button>
        </div>
    </div>
}

export default Participants;