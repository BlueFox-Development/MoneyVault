const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (client, message, args) => {

    let command = args[0].toLowerCase();
    if (!command) return client.sendErrorEmbed(message.channel, 'Please provide a command to reload');

    if (!client.commands.get(command) || client.commands.get(client.aliases.get(command))) return client.sendErrorEmbed(message.channel, 'That is not a command')

    let commandData = client.commands.get(command) || client.commands.get(client.aliases.get(command));

    let reload = await client.reloadCommand(command);
    if (!reload) return client.sendEmbed(message.channel, "Error!", "There was an error reloading that command!");

    return client.sendEmbed(message.channel, `Command has been reloaded!`, `**Name**: ${commandData.help.name}\n**Description**: ${commandData.help.description}\n**DM**: ${commandData.help.dm ? "✅" : "❌"}\n**Aliases**: ${commandData.help.aliases}\n`);

}

module.exports.help = {
    name: "reload",
    description: "Reloads a command",
    dm: true,
    owner: true,
    aliases: ["reloadcmd"]
}