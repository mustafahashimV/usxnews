const dotenv = require("dotenv").config()
const express = require("express")
const app = express();
const { TelegramClient } = require('telegram')
const { StringSession } = require('telegram/sessions')
const input = require('input')
const apiId = Number(process.env.API_ID)
const apiHash = process.env.API_HASH
const stringSession = new StringSession(''); // fill this later with the value from session.save()
(async () => {
    
    const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 })
    await client.start({
        phoneNumber: process.env.PHONE,
        password: async () => await input.text('password?'),
        phoneCode: async () => await input.text('Code ?'),
        onError: (err) => console.log(err),
    });
  console.log('connected.')
    client.sendMessage("me", {message: client.session})
    client.setLogLevel("none")
    client.addEventHandler( (update) => {
    
    if(update.message.peerId.channelId ==1007704706n) {
        let inputString = update.message.message;
        function replaceText(inputText) {
  const replacedText = inputText.replace(/للجزيرة مباشرة/g, "للأنباء الأمريكية");
  return replacedText.replace(/الجزيرة مباشر/g, "الأنباء الأمريكية");
}

// ...

const modifiedText = replaceText(inputString);
function removeWord(inputText){
            return inputText.replace(/عاجل \|?/g, "")
        }

const fMsg = removeWord(modifiedText);
client.sendMessage("usxbreaking", { message: `🚨${fMsg}` });


        
        }
});


})()

app.get("/", (req,res)=> {
  res.json("main")
}).listen(3000)