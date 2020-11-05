const Discord = require('discord.js');

exports.run = async (client, message, args) => {

    `\`${message.guild.roles.cache.filter(r => r.position !== 0).map(r => r.name).join(', ')}\``;

    let text = message.guild.channels.cache.filter(c => c.type === 'text').size;
    let voice = message.guild.channels.cache.filter(c => c.type === 'voice').size;
    let categories = message.guild.channels.cache.filter(c => c.type === 'category').size;

    let online = message.guild.presences.cache.filter(p => p.status === 'online').size;
    let idle = message.guild.presences.cache.filter(p => p.status === 'idle').size;
    let dnd = message.guild.presences.cache.filter(p => p.status === 'dnd').size;
    let offline = message.guild.members.size - (online + idle + dnd);

    let roles = message.guild.roles.cache.map(roles => `${roles}`).join(', ').substr(0, 1024);


    const embed = new Discord.MessageEmbed()
        .setColor(client.config.embed.color)
        .setTitle(message.guild.name)
        .setThumbnail(message.guild.iconURL)

    embed.addField(`👥 Members [${message.guild.members.size}]`, `
Online: \`${online}\` | Offline: \`${offline}\`
DND: \`${dnd}\` | Idle: \`${idle}\`
`, true)

    embed.addField(`📁 Channels [${message.guild.channels.size}]`, `
Text: \`${text}\` Voice: \`${voice}\`
Category: \`${categories}\`
`, true)


    embed.addField(`⚙ General Info`, `
Server ID: \`${message.guild.id}\`
Region: \`${message.guild.region}\`
Created: \`${message.guild.createdAt.toDateString()}\`
Owner: \`${message.guild.owner.user.tag}\`
`, false)

    embed.addField(`🔰 Roles [${message.guild.roles.size}]`, `
${roles}
`, true)

        .setFooter(client.config.embed.footer)
        .setTimestamp();

    await message.channel.send(embed);
    return;

};

module.exports.help = {
    name: "serverinfo",
    description: "View the current server info",
    dm: false,
    aliases: ["si","server"]
}