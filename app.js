
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
  

  client.addEventHandler(async (update) => {
    let mText = await processString(update.message.message);
    update.message.message = mText;
    let message = update.message;

const channels = [
      { sourceChannelId: 1007704706n, username: "usxbreaking", media: false },
      { sourceChannelId: 1844702414n, username: "usxsport", media: true },
    ];

    function post(sourceChannelId, username, media) {
      for (const channel of channels) {
        if (update.message.peerId.channelId === sourceChannelId) {
          client.sendMessage(username, { message: media ? message : mText });
        }
      }
    }

    for (const channel of channels) {
      post(channel.sourceChannelId, channel.username, mapping.media);
    }



    if (update.message.peerId.channelId === 1691865575n) {
      msg = await translateText("en", update.message.message);
      client.sendMessage("usxnews_en", { message: msg });
    }


})();
})

app.get("/check", (req, res) => {
  res.status(200).json("Check Passed!")
})

app.listen(3000, ()=> console.log("listening..8080"))