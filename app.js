const dotenv = require("dotenv").config()

const { TelegramClient } = require('telegram')
const { StringSession } = require('telegram/sessions')
const input = require('input')
const apiId = Number(process.env.API_ID)
const apiHash = process.env.API_HASH
const stringSession = new StringSession('1AgAOMTQ5LjE1NC4xNjcuNDEBu3VLte1mvrSCOHOqaQclj9PFNtBOgowGE43GMbbBEYAqFsczv7I2tLrto+18XiqY5VO2+Wr32WBP6JEM+2j2GSIH8hgGDxs8iX/Ucluvh2wbLGwUGRkiimCvBT1iF4rsrAWDIzVjjPWm52rGU4xUguWZDZ4PIUeOQmaVDuoaNWBj67j5d97Y1cjN5GOMwODK+yhE4Ct3ChG4md5P9C9kCJc3FG2+VmngkJMC9gDbnZzgQrfhoJJr2qwuiHk+cfeHt+3faB3f5H2tgKL94/OrUBUEkQh9czQAZyQ4yfLxA/iZN+ny5Rx/+feUAStM4rrPGuPs8NkmwLoA9uRIrq3bKvo='); // fill this later with the value from session.save()
(async () => {
    
    const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 })
    await client.start({
        phoneNumber: process.env.PHONE,
        password: async () => await input.text('password?'),
        phoneCode: async () => await input.text('Code ?'),
        onError: (err) => console.log(err),
    });
    console.log('connected.')
    client.setLogLevel("none")
    client.addEventHandler( (update) => {
    
    if(update.message.peerId.channelId ==1007704706n) {
        let inputString = update.message.message;
        function replaceText(inputText) {
          return inputText.replace(/الجزيرة( مباشر)?/g, 'الانباء الامريكية');
        }
        function removeWord(inputText){
            return inputText.replace(/عاجل \|?/g, "")
        }
        
        const modifiedText = replaceText(inputString);
        const fMsg = removeWord(modifiedText)
        client.sendMessage("usxbreaking", {message: `🚨${fMsg}`})
    }
 
});


})()
