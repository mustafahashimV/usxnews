const dotenv = require("dotenv").config()
const { TelegramClient } = require('telegram')
const { StringSession } = require('telegram/sessions')
const input = require('input')
const express = require("express")
const app = express()
const apiId = Number(process.env.API_ID)
const apiHash = process.env.API_HASH

const stringSession = new StringSession('1AgAOMTQ5LjE1NC4xNjcuNTEBu45+DxUf9oi5mz4OFPHreBI1X6awevbqBsvs9fdSs3TQAxzAWrmAx+3lVp2iSqwjGfzZ/yIbQgj5l5IXFw+ThC3SsnkE97yqNLUOrTpwyzmEOOGIc5wLa2cyRud8Jtgy/OWvP//pj2iY9lAv40+2MQr5CrQDxlRZvqdYwghFbJAD0n5fyMavSXcOZ7h4w4g7SN67Ab8vOpL7ihOXBzlBZD/bJF0Q0Sj6gPzmCObc5IfVHuiImz2JgW83ZYZXEmeCuqn+BahKgcUxwjZ/nxQFrwvp0LAEeTuI6G+IFCAtgDve7+8+ivCm8Z7LrGhGvqEjMjWls0DtW0kyAtQ4JFB/c3k=');

(async () => {
    const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 })
    await client.start({
        phoneNumber: process.env.PHONE,
        password: async () => await input.text('password?'),
        phoneCode: async () => await input.text('Code ?'),
        onError: (err) => console.log(err),
    });
    console.log("connected.")
    
    client.sendMessage("me", { message: client.session.save() });
    client.setLogLevel("none");
    client.addEventHandler((update) => {
        if (update.message.peerId.channelId === 1007704706n) {
            client.sendMessage("me", {message: update.message.message})
            const modifiedMessage = update.message.message.replace(/للجزيرة مباشر/g, "للأنباء الأمريكية");
            const withoutUrgent = modifiedMessage.replace(/عاجل \|?/g, "");
            const containsLink = /https?:\/\/\S+/i.test(withoutUrgent);
            
                client.sendMessage("usxbreaking", { message: `🚨${withoutUrgent}` });
            
        }
    });
})();

app.get("/check", (req, res) => {
    res.status(200)("<p>Check Passed!</p>").json("check passed!");
});

app.listen(3000, () => console.log("Listening on port 3000"));