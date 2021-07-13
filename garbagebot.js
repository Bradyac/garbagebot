/* 
    Garbage Bot lol
    Check if tomorrow is garbage day and if it is send out messages via discord to remind users to set an alarm so they can take the garbage out in the morning.
    
    Garbage dates are hardcoded in every ~year (October-September)
    
    Users must be in the same discord community as the bot
    Users that will be notified have IDs hardcoded into env variables

    Works for our purposes (Davis and Myself)
*/
require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();

// this project was created mid July hence why it only holds dates from July 2021-September 2021
const collectionDates = [
    new Date(2021, 06, 12),
    new Date(2021, 06, 13),
    new Date(2021, 06, 21),
    new Date(2021, 06, 29),
    new Date(2021, 07, 09),
    new Date(2021, 07, 17),
    new Date(2021, 07, 25),
    new Date(2021, 08, 02),
    new Date(2021, 08, 13),
    new Date(2021, 08, 21),
    new Date(2021, 08, 29)
];
const today = new Date();

client.login(process.env.BOT_TOKEN);

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
    console.log("Today: " + today.toDateString());
    let garbageDayIsTomorrow = false;
    for(let collectionDate of collectionDates) {
        if(today.toDateString() === collectionDate.toDateString()) {
            garbageDayIsTomorrow = true;
            break;
        };
    }

    sendGarbageDayMessage(garbageDayIsTomorrow);
});

async function sendGarbageDayMessage(isGarbageDayTomorrow) {
    try {
        if(isGarbageDayTomorrow) {
            const userIDs = [process.env.BRADY_ID, process.env.DAVIS_ID];
            for(let userID of userIDs) {
                const user = await client.users.fetch(userID);
                await user.send("Garbage day is tomorrow! - Set your alarm for 6AM 😄 🕕");
            }
            console.log("Garbage day is tomorrow!");
        } else {
            console.log("Garbage day is not tomorrow.");
        }
    } catch(error) {
        console.log("Error:" + error);
    }
    process.exit(0);
}