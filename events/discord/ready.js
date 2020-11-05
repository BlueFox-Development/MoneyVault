const Discord = require("discord.js");
const moment = require('moment');
require('moment-duration-format');

module.exports = async (client) => {

    // Starting status
    await client.user.setActivity(`starting...`, { type: "PLAYING" });

    // Log stats
    client.log("STATS", `Servers: ${client.guilds.cache.size} - Channels: ${client.channels.cache.size} - Users: ${client.users.cache.size}`)

    // Bot invite
    client.invite = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=${client.config.permissions}&scope=bot`

    // Random Status
    setInterval(async () => {

        let statusList = [
            `[m!] ${client.guilds.cache.size} servers`,
            `[m!] ${client.users.cache.size} users`,
            `FlaringPhoenix#0001`
        ];

        let index = Math.floor(Math.random() * (statusList.length - 1) + 1);

        await client.user.setActivity(statusList[index], { type: 'WATCHING' });

    }, 10000); // every 10 seconds

    // End Time
    let endDate = new Date();

    client.log("BOT", `Bot is online (${client.user.tag})`)

    // Started Status
    await client.user.setActivity(`started! Took ${endDate-client.startDate}ms`, { type: "PLAYING" });

};