module.exports = (client) => {

    client.createGiveaway = (guildID, channelID, messageID, duration, winners, prize, hosterID) => {

        let currentTime = Date.now();

        let check = client.isValidArray([ guildID, channelID, messageID, duration, winners, prize, hosterID ]);
        if (!check) throw "Invalid options";
        
        let giveaway = {
            guildID: guildID,
            channelID: channelID,
            messageID: messageID,
            time: {
                start: currentTime,
                end: currentTime + (duration * 1000)
            },
            winners: {
                count: winners,
                winner: [],
            },
            ended: false,
            prize: prize || "none",
            hosterID: hosterID
        }

        try {
            client.serverDB.push(guildID, giveaway, "giveaways")
        } catch(e) {
            throw client.error(4, "There was an error creating a giveaway for guildID: " + guildID);
        }

        return giveaway;
    }

    client.deleteGiveaway = (guildID, search) => {

    }

    client.editGiveaway = async (guildID, channelID, messageID, newPrize) => {

        let serverDB = client.serverDB.get(guildID);
        let giveaways = serverDB.giveaways;

        let channel = await client.channels.cache.get(channelID);
        let message = await channel.messages.fetch(messageID);

        let embed = message.embeds[0];

        let footer = embed.footer.text;
        let description = embed.description;

        giveaways.forEach(g => {
            if (g.messageID === messageID) {
                client.editEmbed(channel, message.id, `🎉 ${newPrize}`, description, [], footer, /*`Ending in: ${getReadableTime(time)}`*/)
            }
        })

    }

    client.getGiveaway = (guildID, messageID) => {

        let serverDB = client.serverDB.get(guildID);
        let giveaways = serverDB.giveaways;

        giveaways.forEach(g => {
            if (g.messageID === messageID) return g;
        })

        throw "No giveaway was found"

    }

    client.endGiveaway = async (guildID, channelID, messageID) => {

        let guild = await client.guilds.cache.get(guildID);
        let channel = await client.channels.cache.get(channelID);
        let message = await channel.messages.fetch(messageID);

        let reactions = message.reactions.cache;
        let reaction = reactions.get("🎁") || reactions.find(r => r.emoji.name === "🎁");
        let users = (await reaction.users.fetch())
            .filter(u => u.bot === false)
            .filter(u => u.id !== message.client.user.id)
            .filter(u => guild.member(u.id))
            .array();

        let giveaway = await client.getGiveaway(guildID, messageID);

        let prize = giveaway.prize;
        let messageLink = `https://discord.com/channels/${guildID}/${channelID}/${messageID}`;

        let winners = client.rollWinners(users, giveaway.winners.count);
        client.messageWinners(winners, prize, guild.name, messageLink);

        client.editEmbed(channel, message.id, `🎉 ${prize}`, `Winners:\n${winners.map(w => `<@${w.id}>`).toString()}`, [], "Giveaway Ended")

    }

    client.messageWinners = async (winners = [], prize, guildName, messageLink) => {

        for (let i = 0; i < winners.length; i++) {
            let winner = winners[i];
            await client.sendEmbed(winner, `🎉 You have won a giveaway!`, `**Server**: ${guildName}\n**Giveaway**: Click [here](${messageLink}) to view it\n**Prize**: ${prize}`).catch();
        }

        return;

    }

    client.rollWinners = (users = [], winnerCount) => {

        let shuffled = users.sort(() => 0.5 - Math.random());
        let selected = shuffled.slice(0, winnerCount);

        return selected;

    }
    
}