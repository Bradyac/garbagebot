/* 
    Garbage Bot lol
    Check if tomorrow is garbage day and if it is send out messages via discord to remind users to set an alarm so they can take the garbage out in the morning.
    
    Garbage dates are hardcoded in every ~year (October-September)
    Users must be in the same discord community as the bot
    Users that will be notified have IDs hardcoded into env variables
*/
require("dotenv").config()
const Discord = require("discord.js")
const client = new Discord.Client()

const collectionDates = [
    { date: "Thu Aug 19 2021", personOnDuty: "Brady" },
    { date: "Wed Aug 25 2021", personOnDuty: "Davis" },
    { date: "Thu Sep 02 2021", personOnDuty: "Brady" },
    { date: "Mon Sep 13 2021", personOnDuty: "Davis" },
    { date: "Tuesday Sep 21 2021", personOnDuty: "Brady" },
]

const today = new Date().toDateString()
console.log("Today: " + today)

let message = "Garbage day is tomorrow! "
let collectionDate = collectionDates.find((collectionDate) => collectionDate.date == today)
if (collectionDate) {
    message += collectionDate.personOnDuty + "'s turn to take the bins out - Set your alarm for 6AM 😀 🕕"
    console.log(message)
    client.login(process.env.BOT_TOKEN)

    client.on("ready", async () => {
        try {
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
    const userIDs = [process.env.BRADY_ID] //, process.env.DAVIS_ID
    for (let userID of userIDs) {
        const user = await client.users.fetch(userID)
        await user.send(message)
    }
}
