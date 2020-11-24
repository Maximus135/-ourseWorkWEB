import request from 'request';
import express from 'express';



export const YoutubeParser = (streamKey, word, getYoutubeMessage) => {

const myApiKey = 'AIzaSyA741aU563OisO0SG8oM381Vp04_OHeHF8';
const app = express();

app.listen(4242,() => {
    main();
});

const main = () => {
    let src = 'eInJbzyZjWY';
    getLiveChatId(src, (liveChatId) => {
        console.log(`liveChatId=${liveChatId}`);
        if (liveChatId) {
            requestChatMessages('', liveChatId);
        }
    });
};

const chatMessageUrl = 'https://www.googleapis.com/youtube/v3/liveChat/messages';

const requestChatMessages = (nextPageToken, liveChatId) => {
    const requestProperties = {
        liveChatId: liveChatId,
        part: 'snippet, id, authorDetails',
        key: myApiKey,
        maxResults: 50,
        pageToken: nextPageToken,
    };
    request({ url: chatMessageUrl, qs: requestProperties }, (error, response, body) => {
        body = JSON.parse(body);
        if (body.items) {
            for (body.items.item of body.items) {
                getYoutubeMessage(body.items.item.authorDetails.displayName, body.items.item.snippet.displayMessage);
            }
        }
        setTimeout(() => {
            requestChatMessages(body.nextPageToken, liveChatId);
        }, body.pollingIntervalMillis);
    });
};

const getLiveChatId = (videoId, callback) => {
    const url =
    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${myApiKey}&part=liveStreamingDetails,snippet`;
    request(url, (error, response, body)=> {
        if(body !== undefined){
            const bodyObj = JSON.parse(body);
            callback(bodyObj.items[0].liveStreamingDetails.activeLiveChatId);
        }
    });
};

};