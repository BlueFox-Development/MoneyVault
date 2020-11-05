const Discord = require('discord.js');
const moment = require('moment');

exports.run = async (client, message, args) => {

    let user;

    if (!args[0]) {
        user = message.author;
    } else if (message.mentions.users.first() != null) {
        user = message.mentions.users.first();
    } else if (!isNaN(args[0])) {
        user = client.users.cache.get(args[0]);
    }
    const member = message.guild.member(user);

    const embed = new Discord.MessageEmbed()
        .setColor(client.config.embed.color)
        .setTitle(`${user.username}#${user.discriminator}`)
        .setFooter(client.config.embed.footer)

    embed.addField(`📅 Dates`, `
Joined: \`${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY")}\`
Created: \`${message.guild.createdAt.toDateString()}\`
`, true)

    embed.addField(`📁 Other`, `
Avatar: [Click-Here](https://cdn.discordapp.com/avatars/${message.author.id}/${user.avatar}.webp?size=128)
Last Message: [Click-Here](https://discordapp.com/channels/${message.guild.id}/${member.user.lastMessageChannelID}/${member.user.lastMessageID})
Speaking: ${member.speaking ? "\`True\` - Channel: " + message.guilds.channels.cache.get(member.voiceChannelID) : '\`False\`'}
`, true)


    embed.addField(`⚙ General Info`, `
User ID: \`${message.author.id}\`
Nickname: \`${member.nickname !== null ? `${member.nickname}` : 'None'}\`
Bot: \`${user.bot}\`
Status: \`${user.presence.status}\`
Game: \`${user.presence.game ? user.presence.game.name : 'None'}\`
`, false)

    embed.addField(`🔰 Roles [${message.member.roles.cache.size}]`, `
${member.roles.cache.map(roles => `${roles}`).join(', ').substr(0,1024)}
`, true)

    embed.setTimestamp();

    return await message.channel.send(embed);

}

module.exports.help = {
    name: "userinfo",
    description: "Shows a user's information",
    dm: false,
    aliases: ["ui","user"]
}
