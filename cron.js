const cron = require("cron")
const https = require("https")

const backendUrl= "https://usxnewsbot.onrender.com"
const job = new cron.CronJob("*/14 * * * *", function(){
    console.log("restarting..")
    https.get(backendUrl, (res)=> {
        if(res.statusCode==200){
            console.log("restarted")
        }else {
            console.error("restart failed")
        }
    })
}).on("error", (err)=>{
    console.error("error occurred from cron"+ err.message)
})

module.exports ={
    job,
}