


const dotenv = require("dotenv").config()
const { Api, TelegramClient } = require('telegram')
const { StringSession } = require('telegram/sessions')
const input = require('input')
const express = require("express")
const app = express()
const apiId = Number(process.env.API_ID)
const apiHash = process.env.API_HASH
const { TwitterApi } = require("twitter-api-v2"); 

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
    
    client.addEventHandler( async (update) => {
    let mText = await filter.filter(update.message.message);
    update.message.message = mText;
    
    let message = update.message;
    
    async function post(channelFrom, channelTo, media) {
    if(update.message.peerId.channelId == channelFrom){
      await client.sendMessage(`${channelTo}`, { message: media ? message : mText });
     }
    }

    let channels = [
      { source: 1007704706n, username: "usxbreaking", media: false},
      { source: 1844702414n, username: "usxsport", media: true}
    ]
    
    if(update.message.peerId.channelId == 1691865575n){
        msg = await translateText("en", update.message.message)
       client.sendMessage("usxnews_en", { message: msg })
    } else {
      for (channel of channels) {
        post(channel.source, channel.username, channel.media)
      }
    }
        
});
})()

app.get("/check", (req, res) => {
  res.status(200).json("Check Passed!")
})

app.listen(3000, ()=> console.log("listening..8080"))