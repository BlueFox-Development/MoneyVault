const { time } = require("console");
const Discord = require("discord.js");
const fs = require("fs");
const { getMilliseconds, getReadableTime } = require('quick-ms');

exports.run = async (client, message, args, userConf, guildConf) => {

    if (!client.checkPerms(message)) { return await client.sendErrorEmbed(message.channel, `Insufficient Permissions`);}

    let channel;

    let guildID = message.guild.id;
    let channelID = null;
    let messageID = null;
    let duration = null;
    let winners = null;
    let prize = null;
    let hosterID = message.author.id;

    let msg = await client.sendEmbed(message.channel, "What channel should the giveaway be posted in? (#channel)", "This process will timeout in 60 seconds");

    let filter = m => m.mentions.channels.size > 0 && m.author.id === message.author.id;
    let collector = message.channel.createMessageCollector(filter, { amount: 1, time: 60000 });

    collector.on('collect', async (m) => {
        channelID = m.mentions.channels.first().id;
        await m.delete();
        let channel = m.guild.channels.cache.get(channelID);
        if (channel === null) {
            return await client.sendErrorEmbed("Invalid channel! Please start over...")
        }
        await client.editEmbed(message.channel, msg.id, "How many winners should there be? (number)", "Must be less than 10\nThis process will timeout in 60 seconds");
        collector.stop();

        filter = m => !isNaN(m.content) && m.content < 10 && m.author.id === message.author.id;
        collector = message.channel.createMessageCollector(filter, { amount: 1, time: 60000 });
        collector.on('collect', async (m) => {
            winners = m.content;
            await m.delete();
            await client.editEmbed(message.channel, msg.id, "How long should the giveaway last? (EX: 1m, 1h, 1d, 1w)", "This process will timeout in 60 seconds");
            collector.stop();

            filter = m => m.content && m.author.id === message.author.id;
            collector = message.channel.createMessageCollector(filter, { amount: 1, time: 60000 });
            collector.on('collect', async (m) => {
                duration = getMilliseconds(m.content) / 1000;
                await m.delete();
                await client.editEmbed(message.channel, msg.id, "What should the giveaway prize be? (text)", "This process will timeout in 60 seconds");
                collector.stop();

                filter = m => m.content && m.author.id === message.author.id;
                collector = message.channel.createMessageCollector(filter, { amount: 1, time: 60000 });
                collector.on('collect', async (m) => {
                    prize = m.content;

                    await m.delete()
                    await client.editEmbed(message.channel, msg.id, `Success!`, `The giveaway has started in ${channel}!\n\nPrize: \`\`\`${prize}\`\`\``, [], `Duration: ${getReadableTime(time*1000)} seconds`);
                    collector.stop();

                    let giveawayMsg = await client.sendEmbed(channel, `🎉 ${prize}`, `Winners: ${winners}`, [], `Ending in: ${getReadableTime(time)}`);
                    messageID = giveawayMsg.id;
                    await giveawayMsg.react("🎁");
                    
                    await client.createGiveaway(guildID, channelID, messageID, duration/1000, winners, prize, hosterID)

                });

            });

        });

    });
    
}

module.exports.help = {
    name: "create",
    description: "Creates a giveaway",
    dm: false,
    aliases: ["c"]
}