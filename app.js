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

    var channels = [
      { source: 1502638425n, username: "usxforex", media: false },
      { source: 1844702414n, username: "usxsport", media: true }
      // ADD 
  ];

    

    client.addEventHandler(async (update) => {

        let mText = await filter.filter(update.message.message);
        update.message.message = mText;
        var messageT = update.message
        async function post(channelFrom, channelTo, media) {
            if (update.message.peerId.channelId == channelFrom) {
                await client.sendMessage(`${channelTo}`, { message: media ? messageT : mText });
            }
        }

        let channelSourceId = update.message.peerId.channelId;
        let aljazeersId = 1007704706n;
        let roaaId = 1397461589n;
        let russianReportsId = 1893971121n;
        let forexnewsId = 1502638425n;
        let testCh = 1959122209n;

        if(channelSourceId == testCh || channelSourceId == roaaId || channelSourceId == russianReportsId) {
            const translatedMessage = await translatte(mText, { to: "ar" }).then(async res => {
                messageT.message = res.text
                await post(testCh, "usxnews", true);
        
            }).catch(error => {
                client.sendMessage("me", { message: error });
            });
        }
        
        if(channelSourceId==forexnewsId){
            await post(forexnewsId, "usxforex", true)
        }

        if(channelSourceId==forexnewsId) {
            await client.sendMessage("swiftnexus", { message: update.message })
        }

        if (channelSourceId == aljazeersId) {
            
                const translatedMessage = await translatte(mText, { to: "en" }).then(async res => {
                    await client.sendMessage("usxnews_en", { message: res.text })
                    
                }).catch(error => {
                    client.sendMessage("me", { message: error });
                });
        }
        if(channelSourceId == aljazeersId) {
            await post(aljazeersId, "usxbreaking", false)
        }
    });

})();

app.get("/check", (req, res) => {
    res.status(200).json("Check Passed!");
});

app.listen(3000, () => console.log("listening..8080"));