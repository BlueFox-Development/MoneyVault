const Discord = require("discord.js");

module.exports = async (client, guild) => {

    client.log("GUILDS", `The bot has joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members.`);

}