const Discord = require("discord.js");

exports.run = async (client, message, args) => {

    await client.sendEmbed(message.channel, client.config.botName,
    `[Click-Here](${client.invite}) to invite me to your server`)

    return;


}

module.exports.help = {
    name: "invite",
    description: "Shows you how to invite the bot to your server",
    dm: true,
    aliases: ["inv"]
}