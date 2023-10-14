const dotenv = require("dotenv").config()

const { TelegramClient } = require('telegram')
const { StringSession } = require('telegram/sessions')
const input = require('input')
const apiId = Number(process.env.API_ID)
const apiHash = process.env.API_HASH
const stringSession = new StringSession('1AgAOMTQ5LjE1NC4xNjcuNTEBuyDviCBwVltVesDjv/zJaXEB7QgrMRikDzwfzQyPYd/fzri9uzFXsK6U10gwdNh4zMdBzo78qBv3Z9CjM9TXffvgtL5P5upmn864MfNI9xFrPyBZRwuluGOj0QqYiHXZgqc9MzaXuFUbNCW06c3nRB7lvu5w4GKNuoBRP5v2jvDgsTA4pabGyv1Q6HQYP1SjjTZNV3+L3p7nylSXAN0rgAfyP5dLrrp2SJKglf+ZDdYtgjRUr/sSflhgR231xviGLB/MtZABIv4ep1C9S5QfG2oiEkNDQTkNrJGpC5sGjiNRy5+tR+jH3f66i4QB8LN8MfRW3u10h5zNq932VRNYOEg='); // fill this later with the value from session.save()
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
