import twitch from 'twitch-js';

export const TwitchParser = (channel, word, getTwitchMesage) =>{

const options = {
    connection: {
        cluster: 'aws',
        reconnect: true,
    },
    identity: {
        username: 'bot_rchiem',
        password: 'oauth:3ydg9ojjthbb135lgpurekwdr8wu9f',
    },
    channels: [channel],
};

const client = new twitch.client(options);
client.connect();

client.on('chat', (channel, user, message, self)=> {
    if (message) {
        getTwitchMesage(message);
    }
});

};