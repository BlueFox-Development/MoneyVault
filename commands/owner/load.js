const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (client, message, args) => {

    let command = args[0].toLowerCase();
    if (!command) return client.sendErrorEmbed(message.channel, 'Please provide a command to load');

    let reload = await client.loadCommand(command);
    if (!reload) return client.sendEmbed(message.channel, "Error!", "There was an error loading that command!");

    return client.sendEmbed(message.channel, `Command has been loaded!`, ``);

}

module.exports.help = {
    name: "load",
    description: "Loads a command",
    dm: true,
    owner: true,
    aliases: ["loadcmd"]
}