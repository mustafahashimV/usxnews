const dotenv = require("dotenv").config()
const { TelegramClient } = require('telegram')
const { StringSession } = require('telegram/sessions')
const input = require('input')
const apiId = Number(process.env.API_ID)
const apiHash = process.env.API_HASH
const stringSession = new StringSession('1AgAOMTQ5LjE1NC4xNjcuNTEBuxeBJs9YMuHXKhFp9Zo3C5sK/54QeSKLYkyJEy8g9QAZowTXGqmB1hUXl1t1RqR9/nwp9BLZsvwUd1DeQS4CXtqjzgqyQ1Kz22wh+AQ/qnrL7pxsO0xyVJZiQBS5MMCFlM5KrLhqfcwCvBwhYXgBZ7U3UvLOZRdrJR/6VFoRL1aXHkQ2ZZRg/zAzJNgsYh1xXREqrjbgyT/w0Ql1GFqAVYWhXJxCg2acaK4CfoMdA4oupYTqrSTtOmFzB5xtd8cYevRtrk/KgZ68H3TQqb2I9VBwINDw6exPrrrL4tzsp78BciijR7esuHbd6PNvKKXkORidu3tH3k2xBl5HdeLNNNA='); // fill this later with the value from session.save()
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

const modifiedText = replaceText(inputString);
function removeWord(inputText){
            return inputText.replace(/عاجل \|?/g, "")
        }

const fMsg = removeWord(modifiedText);
client.sendMessage("usxbreaking", { message: `🚨${fMsg}` });
        }
});
})()