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
    { date: "Wed Sep 29 2021", personOnDuty: "Brady" },
    { date: "Thu Oct 07 2021", personOnDuty: "Davis" },
    { date: "Mon Oct 18 2021", personOnDuty: "Brady" },
    { date: "Tue Oct 26 2021", personOnDuty: "Davis" },
    { date: "Wed Nov 03 2021", personOnDuty: "Brady" },
    { date: "Thu Nov 11 2021", personOnDuty: "Brady" },
    { date: "Sun Nov 21 2021", personOnDuty: "Davis" },
    { date: "Mon Nov 29 2021", personOnDuty: "Brady" },
    { date: "Tue Dec 07 2021", personOnDuty: "Davis" },
    { date: "Wed Dec 15 2021", personOnDuty: "Brady" },
    { date: "Thu Dec 23 2021", personOnDuty: "Davis" },
    { date: "Wed Jan 05 2022", personOnDuty: "Brady" },
]

const today = new Date().toDateString()
console.log("Today: " + today)

let collectionDate = collectionDates.find((collectionDate) => collectionDate.date == today)
if (collectionDate) {
    let message =
        "Garbage day is tomorrow! " +
        collectionDate.personOnDuty +
        "'s turn to take the bins out 🗑 - Set your alarm for 6AM 😀 🕕"
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
