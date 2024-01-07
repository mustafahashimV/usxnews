const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const input = require('input');
const translatte = require("translatte");

// Replace placeholders with your sensitive information
const apiId = process.env.API_ID;
const apiHash = process.env.API_HASH;
const stringSession = new StringSession(process.env.STRING_SESSION);

(async () => {
    const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 })

    if (client.isConnected()) {
        await client.logOut();
        console.log('Logged out of the previous session.');
    }

    await client.start({
        phoneNumber: process.env.PHONE,
        password: async () => await input.text('password?'),
        phoneCode: async () => await input.text('Code ?'),
        onError: (err) => console.log(err),
    });

    console.log('Connected.');

    client.sendMessage("me", { message: client.session.save() });
    client.setLogLevel("none");
    
    client.addEventHandler(async (update) => {
        let mText = await filter.filter(update.message.message);
        update.message.message = mText;
        var messageT = update.message

        async function post(channelFrom, channelTo, media) {
            await client.sendMessage(`${channelTo}`, { message: media ? messageT : mText }); 
        }

        let channelSourceId = update.message.peerId.channelId;

        let aljazeersId = 1007704706n;
        let testCh = 1959122209n;

        if (channelSourceId == aljazeersId) {
            const translatedMessage = await translatte(mText, { to: "en" }).then(async res => {
                await client.sendMessage("usxnews_en", { message: res.text })
            }).catch(error => {
                client.sendMessage("me", { message: error });
            });
        }

        if (channelSourceId == aljazeersId) {
            await post(aljazeersId, "usxbreaking", false);
        }

    });
})();