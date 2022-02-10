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
    { date: "Sun Jan 23 2022", personOnDuty: "Davis" },
    { date: "Mon Jan 31 2022", personOnDuty: "Brady" },
    { date: "Tue Feb 08 2022", personOnDuty: "Davis" },
    { date: "Wed Feb 16 2022", personOnDuty: "Brady" },
    { date: "Sun Feb 27 2022", personOnDuty: "Davis" },
    { date: "Mon Mar 07 2022", personOnDuty: "Brady" },
    { date: "Tue Mar 15 2022", personOnDuty: "Davis" },
    { date: "Wed Mar 23 2022", personOnDuty: "Brady" },
    { date: "Thu Mar 31 2022", personOnDuty: "Davis" },
    { date: "Sun Apr 10 2022", personOnDuty: "Davis" },
    { date: "Wed Apr 20 2022", personOnDuty: "Davis" },
    { date: "Thu Apr 28 2022", personOnDuty: "Davis" },
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
