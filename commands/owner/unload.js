const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (client, message, args) => {

    let command = args[0].toLowerCase();
    if (!command) return client.sendErrorEmbed(message.channel, 'Please provide a command to load');

    let reload = await client.unloadCommand(command);
    if (!reload) return client.sendEmbed(message.channel, "Error!", "There was an error unloading that command!");

    return client.sendEmbed(message.channel, `Command has been unloaded!`, ``);

}

module.exports.help = {
    name: "unload",
    description: "Unloads a command",
    dm: true,
    owner: true,
    aliases: ["unloadcmd"]
}