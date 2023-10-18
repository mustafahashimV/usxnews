


const dotenv = require("dotenv").config()
const { Api, TelegramClient } = require('telegram')
const { StringSession } = require('telegram/sessions')
const input = require('input')
const express = require("express")
const app = express()
const apiId = Number(process.env.API_ID)
const apiHash = process.env.API_HASH
const { TwitterApi } = require("twitter-api-v2"); 
const { translate } = require('bing-translate-api');

const stringSession = new StringSession('1AgAOMTQ5LjE1NC4xNjcuNTEBu45+DxUf9oi5mz4OFPHreBI1X6awevbqBsvs9fdSs3TQAxzAWrmAx+3lVp2iSqwjGfzZ/yIbQgj5l5IXFw+ThC3SsnkE97yqNLUOrTpwyzmEOOGIc5wLa2cyRud8Jtgy/OWvP//pj2iY9lAv40+2MQr5CrQDxlRZvqdYwghFbJAD0n5fyMavSXcOZ7h4w4g7SN67Ab8vOpL7ihOXBzlBZD/bJF0Q0Sj6gPzmCObc5IfVHuiImz2JgW83ZYZXEmeCuqn+BahKgcUxwjZ/nxQFrwvp0LAEeTuI6G+IFCAtgDve7+8+ivCm8Z7LrGhGvqEjMjWls0DtW0kyAtQ4JFB/c3k=');


async function tr(to, text) {
  try {
    const res = await translate(text, null, to, false);
    return res.translation;
  } catch (error) {
    
    return "#The_American_News";
  }
}

async function translateText(to, text) {
  const translation = await tr(to, text);
}

async function processString(inputString) {
          inputString = inputString.replace(/الجزيرة مباشر/g, 'الأنباء الأمريكية');
          inputString = inputString.replace(/للجزيرة مباشر/g, 'للأنباء الأمريكية');
          inputString = inputString.replace(/للجزيرة/g, "للأنباء الأمريكية");
          inputString = inputString.replace(/#الجزيرة/g, "#الانباء_الامريكية");
          inputString = inputString.replace(/(https?|ftp):\/\/[^\s/$.?#].[^\s]*/g, '');
          inputString = inputString.replace(/عاجل \|?/g, "")

          inputString = inputString.replace(/أخبار الكرة العالمية/g, 'الأنباء الأمريكية');
          inputString = inputString.replace(/اخبار الكرة العالمية/g, 'الأنباء الأمريكية');
          inputString = inputString.replace(/(https?|ftp):\/\/[^\s/$.?#].[^\s]*/g, '');
          inputString = inputString.replace(/اخـبـار الـكـرة الـعـالـمـيـة/g, "الأنباء الأمريكية")
          inputString = inputString.replace(/⚡️/g, "")  
            
            return `🚨${inputString}`;
        }

(async () => {
    
    const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 })
    await client.start({
        phoneNumber: process.env.PHONE,
        password: async () => await input.text('password?'),
        phoneCode: async () => await input.text('Code ?'),
        onError: (err) => console.log(err),
    });

    const twC = new TwitterApi({ 

      appKey: "H9gXt508eE76oV3JVFHFdc2Ds", 
  
      appSecret: "MmTyKO7QBP9R0OL1JSrVEt7MrKuACOM8XChAwvTlwhcZc8HQAh", 
  
      accessToken: "1649883383999131649-v55vc21ahqWJMO4JC0PPs3wVGVNoLB", 
  
      accessSecret: "I2U01Kq1scKCZME2FNqDC5U9IJHW4EbSo52QCAG8AELc8", 
  
      bearerToken: "AAAAAAAAAAAAAAAAAAAAACA0qgEAAAAAZQsF1Z1j1jJLidXzBmmyCJdU7P0%3DQxVJcDd0eEy8IpB4ZytmXZMjAyNHGFdOnMYDwwyEcrXX2c6rkS", 
  }); 
    const rwClient = twC.readWrite;
 
    console.log('connected.')
    client.sendMessage("me", {message: client.session.save()})
    client.setLogLevel("none")
    

    client.addEventHandler( async (update) => {
    let mText = await processString(update.message.message);
    
      update.message.message = mText
      let message = update.message
    
    function post(channelFrom, channelTo, media) {
    if(update.message.peerId.channelId==channelFrom){

    client.sendMessage(`${channelTo}`, { message: media ? message : mText })
      
      }
    }

    let channels = [
      { source: 1007704706n, username: "usxbreaking", media: false},
      { source: 1844702414n, username: "usxsport", media: true}
    ]

    await channels.forEach(channel => {
      post(channel.source, channel.username, channel.media);
    });
    
    if(update.message.peerId.channelId == 1691865575n){
        msg = await translateText("en", update.message.message)
       client.sendMessage("usxnews_en", { message: msg })
    }
        
});
})()

app.get("/check", (req, res) => {
  res.status(200).json("Check Passed!")
})

app.listen(3000, ()=> console.log("listening..8080"))