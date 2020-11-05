const moment = require('moment');
require('moment-duration-format');
const Discord = require('discord.js');

exports.run = async (client, message, args, guildConf, userConf) => {

    var duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');

    const embed = new Discord.MessageEmbed()
        .setColor(client.config.embed.color)
        .setTitle('Bot Stats')
        .setThumbnail(client.config.botIconURL)
        .addField(`Memory Usage`, `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\``)
        .addField(`Uptime`, `\`${duration}\``)
        .addField(`Users`, `\`${client.users.cache.filter(u => u.id !== '1').size.toLocaleString()}\``)
        .addField(`Servers`, `\`${client.guilds.cache.size.toLocaleString()}\``)
        .addField(`Channels`, `\`${client.channels.cache.size.toLocaleString()}\``)
        .addField(`Discord.js`, `\`v${Discord.version}\``)
        .addField(`Node`, `\`${process.version}\``)
        .setFooter(client.config.embed.footer);
    embed.setTimestamp();

    await message.channel.send(embed);

};

module.exports.help = {
    name: "botstats",
    description: "Checkout the stats regarding the bot",
    dm: true,
    aliases: []
}