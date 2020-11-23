import twitch from 'twitch-js';

const connections = [];
export const TwitchParser = (channel, word, getTwitchMesage, type=true) =>{

let client; 

const options = {
    connection: {
        cluster: 'aws',
        reconnect: true,
    },
    identity: {
        username: 'bot_rchiem',
        password: process.env.TWITCH_PASSWORD,
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
                getTwitchMesage(user, message);
            }
        }else{
            getTwitchMesage(user, message);
        }
});
}else{
    if(connections.length !== 0){
        const currentclient  = connections.pop();
        currentclient.disconnect();
    }
}

};