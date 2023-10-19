const dotenv = require("dotenv").config()
const { Api, TelegramClient } = require('telegram')
const { StringSession } = require('telegram/sessions')
const input = require('input')
const express = require("express")
const app = express()
const apiId = Number(process.env.API_ID)
const apiHash = process.env.API_HASH
const { TwitterApi } = require("twitter-api-v2"); 
const translatte = require("translatte");
const translate = require("./translate.js")
const filter = require("./filters.js")
const stringSession = new StringSession(process.env.STRING_SESSION);  

(async () => {
    
    const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 })
    await client.start({
        phoneNumber: process.env.PHONE,
        password: async () => await input.text('password?'),
        phoneCode: async () => await input.text('Code ?'),
        onError: (err) => console.log(err),
    });

    const twC = new TwitterApi({ 

      appKey: process.env.XAPP_KEY, 
  
      appSecret: process.env.XAPP_SECRET, 
  
      accessToken: process.env.XACCESS_TOKEN, 
  
      accessSecret: process.env.XACCESS_SECRET, 
  
      bearerToken: process.env.XBEARER_TOKEN, 
  });

    const rwClient = twC.readWrite;
 
    console.log('connected.')
    client.sendMessage("me", {message: client.session.save()})
    client.setLogLevel("none")

    const channels = [
        { source: 1007704706n, username: "usxbreaking", media: false }
        
    ];

    const processedUpdates = new Set();

    client.addEventHandler(async (update) => {
        if (processedUpdates.has(update.id)) {
            return;
        }
        processedUpdates.add(update.id);

        let mText = await filter.filter(update.message.message);
        update.message.message = mText;

        async function post(channelFrom, channelTo, media) {
            if (update.message.peerId.channelId == channelFrom) {
                await client.sendMessage(`${channelTo}`, { message: media ? message : mText });
            }
        }

        let channelSourceId = update.message.peerId.channelId;

        if (channelSourceId == channels[0].source) {
            if (!update.message.message.includes("Translation Sent")) {
                const translatedMessage = await translatte(mText, { to: "en" }).then(async res => {
                    await post(channels[0].source, channels[0].username, channels[0].media);
                    await client.sendMessage(`usxnews_en`, { message: res.text });
                }).catch(error => {
                    client.sendMessage("me", { message: error });
                });
            }
        }
    });

})();

app.get("/check", (req, res) => {
    res.status(200).json("Check Passed!");
});

app.listen(3000, () => console.log("listening..8080"));