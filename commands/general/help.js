const Discord = require("discord.js");

exports.run = async (client, message, args, userConf, guildConf) => {

    if (args[0]) {
        const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));

        if (cmd) {
            await client.sendEmbed(message.channel, `Help`, `**Name**: ${cmd.help.name}\n**Description**: ${cmd.help.description}\n**DM**: ${cmd.help.dm}\n**Cooldown**: ${cmd.help.cooldown ? cmd.help.cooldown + " Seconds" : "None"}\n**Aliases**: ${cmd.help.aliases}`);
            return;
        } else {
            await client.sendErrorEmbed(message.channel, "That is not a valid command or alias")
            return;
        }
    }

    await client.sendEmbed(message.channel, "Help Menu",
    `[Click-Here](${client.invite}) to invite me to your server`, [
        {
            name: "General",
            value: "help, botstats, ping, serverinfo, userinfo, invite"
        },
        {
            name: "Giveaway",
            value: "create, edit, reroll, delete, giveaways"
        },
        {
            name: "Premium",
            value: "premium, stats, api, config"
        }
    ])

    return;


}

module.exports.help = {
    name: "help",
    description: "Shows you all the commands",
    dm: true,
    aliases: ["h"]
}