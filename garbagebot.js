/* 
    Garbage Bot lol
    Check if tomorrow is garbage day and if it is send out messages via discord to remind users to set an alarm so they can take the garbage out in the morning.
    
    Garbage dates are hardcoded but could be a seperate JSON file
    Users must be in the same discord community as the bot
    Users that will be notified have IDs hardcoded into env variables
*/
require("dotenv").config()
const Discord = require("discord.js")
const client = new Discord.Client()

const collectionDates = [
    { date: "Wed Apr 20 2022", personOnDuty: "Davis" },
    { date: "Thu Apr 28 2022", personOnDuty: "Brady" },
    { date: "Sun May 08 2022", personOnDuty: "Davis" },
    { date: "Mon May 16 2022", personOnDuty: "Brady" },
    { date: "Wed May 25 2022", personOnDuty: "Davis" },
    { date: "Thu Jun 02 2022", personOnDuty: "Brady" },
    { date: "Sun Jun 12 2022", personOnDuty: "Davis" },
    { date: "Mon Jun 20 2022", personOnDuty: "Brady" },
    { date: "Tue Jun 28 2022", personOnDuty: "Davis" },
    { date: "Thu Jul 07 2022", personOnDuty: "Brady" },
    { date: "Sun Jul 17 2022", personOnDuty: "Davis" },
    { date: "Mon Jul 25 2022", personOnDuty: "Brady" },
    { date: "Wed Aug 03 2022", personOnDuty: "Davis" },
    { date: "Thu Aug 11 2022", personOnDuty: "Brady" },
    { date: "Sun Aug 21 2022", personOnDuty: "Davis" },
    { date: "Mon Aug 29 2022", personOnDuty: "Brady" },
    { date: "Wed Sep 07 2022", personOnDuty: "Davis" },
    { date: "Thu Sep 15 2022", personOnDuty: "Brady" },
    { date: "Sun Sep 25 2022", personOnDuty: "Davis" },
]

const today = new Date().toDateString()
console.log("Today: " + today)

let collectionDate = collectionDates.find((collectionDate) => collectionDate.date == today)
if (collectionDate) {
    let message = "Garbage day is tomorrow! " + collectionDate.personOnDuty + "'s turn to take the bins out 🗑 - Set your alarm for 6AM 😀 🕕"
    client.login(process.env.BOT_TOKEN)

    client.on("ready", async () => {
        try {
            console.log(message)
            await sendMessage(message)
            process.exit(0)
        } catch (error) {
            console.log("Error: " + error)
            process.exit(1)
        }
    })
} else {
    console.log("Garbage day is not tomorrow.")
    process.exit(0)
}

async function sendMessage(message) {
    const userIDs = [process.env.BRADY_ID, process.env.DAVIS_ID]
    for (let userID of userIDs) {
        const user = await client.users.fetch(userID)
        await user.send(message)
    }
}
