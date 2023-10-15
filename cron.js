const cron = require("cron")
const https = require("https")

const backendUrl= "https://usxnewsbot.onrender.com:80/check"
const job = new cron.CronJob("*/14 * * * *", function(){
    console.log("restarting..")
    https.get(backendUrl, (res)=> {
        if(res.statusCode==200){
            console.log("restarted")
        }else {
            console.error("restart failed")
        }
    })
})

module.exports ={
    job: job
}