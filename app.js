
const dotenv = require("dotenv").config()
const { Api, TelegramClient } = require('telegram')
const { StringSession } = require('telegram/sessions')
const input = require('input')
const express = require("express")
const app = express()
const apiId = Number(process.env.API_ID)
const apiHash = process.env.API_HASH
const { TwitterApi } = require("twitter-api-v2"); 


const stringSession = new StringSession('1AgAOMTQ5LjE1NC4xNjcuNTEBu45+DxUf9oi5mz4OFPHreBI1X6awevbqBsvs9fdSs3TQAxzAWrmAx+3lVp2iSqwjGfzZ/yIbQgj5l5IXFw+ThC3SsnkE97yqNLUOrTpwyzmEOOGIc5wLa2cyRud8Jtgy/OWvP//pj2iY9lAv40+2MQr5CrQDxlRZvqdYwghFbJAD0n5fyMavSXcOZ7h4w4g7SN67Ab8vOpL7ihOXBzlBZD/bJF0Q0Sj6gPzmCObc5IfVHuiImz2JgW83ZYZXEmeCuqn+BahKgcUxwjZ/nxQFrwvp0LAEeTuI6G+IFCAtgDve7+8+ivCm8Z7LrGhGvqEjMjWls0DtW0kyAtQ4JFB/c3k='); // fill this later with the value from session.save()
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
  
    if(update.message.peerId.channelId ==1007704706n) {
        let message = update.message.message;
        function processString(inputString) {
          inputString = inputString.replace(/الجزيرة مباشر/g, 'الأنباء الأمريكية');
          inputString = inputString.replace(/للجزيرة مباشر/g, 'للأنباء الأمريكية');
          inputString = inputString.replace(/(https?|ftp):\/\/[^\s/$.?#].[^\s]*/g, '');
          inputString = inputString.replace(/عاجل \|?/g, "")
          return inputString;
        }

        const fMsg = processString(message);

        client.sendMessage("usxbreaking", { message: `🚨${fMsg}` });
      
        } else if(update.message.peerId.channelId== 1844702414n) {
          let message = update.message.message;
          function processString(inputString) {
            inputString = inputString.replace(/أخبار الكرة العالمية/g, 'الأنباء الأمريكية');
            inputString = inputString.replace(/اخبار الكرة العالمية/g, 'للأنباء الأمريكية');
            inputString = inputString.replace(/(https?|ftp):\/\/[^\s/$.?#].[^\s]*/g, '');
            inputString = inputString.replace(/خـبـار الـكـرة الـعـالـمـيـة/g, "")
            return inputString;
          }
  
          const fMsg = await processString(message);
  
          client.sendMessage("usxsport", { message: fMsg });
        }
        
});
})()

app.get("/check", (req, res) => {
  res.status(200).json("Check Passed!")
})

app.listen(3000, ()=> console.log("listening..8080"))