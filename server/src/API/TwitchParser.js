import twitch from 'twitch-js';

const connections = [];
export const TwitchParser = (channel, word, getTwitchMessage, type=true) =>{

let client; 

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

if(type){
    client = new twitch.client(options);
    client.connect();

    connections.push(client);

    client.on('chat', (channel, user, message, self)=> {
        if(word !== ''){
            if (message === word) {
                getTwitchMessage(user, message);
            }
        }else{
            getTwitchMessage(user, message);
        }
});
}else{
    if(connections.length !== 0){
        const currentclient  = connections.pop();
        currentclient.disconnect();
    }
}

};