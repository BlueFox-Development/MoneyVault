const Discord = require("discord.js");

module.exports = (client, guild) => {

    client.log("GUILDS", `The bot has been removed from: ${guild.name} (id: ${guild.id})`);

}