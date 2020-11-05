const Discord = require("discord.js");

module.exports = async (client, packet) => {

    let whitelisted = ['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'];
    if (!whitelisted.includes(packet.t)) return;

    let giveaway;
    client.serverDB.forEach(s => {
        s.giveaways.forEach(g => {
            if (g.messageID === packet.d.message_id) {
                giveaway = g;
            }
        })
    })

    if (!giveaway) return;
    if (giveaway.ended) return;

    let { d: data } = packet;

    const user = client.users.cache.get(data.user_id);
    if (!user) return;
    
    const guild = client.guilds.cache.get(packet.d.guild_id);
    if (!guild) return;

    const channel = guild.channels.cache.get(packet.d.channel_id);
    if (!channel) return;

    const message = await channel.messages.fetch(packet.d.message_id);
    if (!message) return;

    const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
    let reaction = message.reactions.cache.get(emojiKey);

    if (reaction.emoji.name !== packet.d.emoji.name) return;
    if (reaction.emoji.id && reaction.emoji.id !== packet.d.emoji.id) return;


    if (packet.t === 'MESSAGE_REACTION_ADD') {

        await client.sendEmbed(user, "Success!", `Your entry for the giveaway has been approved!\n\nGood Luck! 🍀`);

    } else {

        //await client.sendEmbed(user, "Hmm...", `Your entry for the giveaway in has been removed.`);

    }

};
