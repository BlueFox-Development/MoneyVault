module.exports = (client) => {

    client.sendEmbed = (channel, title, description, fields, footer, color, thumbnail) => {
        return new Promise((resolve, reject) => {
            channel.send({
                embed: {
                    title: title,
                    description: description,
                    fields: fields,
                    thumbnail: { url: thumbnail || "" },
                    color: color || client.config.embed.color,
                    footer: { text: footer || client.config.embed.footer}
                }
            }).then(message => {
                resolve(message);
                return message;
            }).catch(err => {
                reject(err);
            });
        });
    }

    client.sendErrorEmbed = (channel, error) => {
        return new Promise((resolve, reject) => {
            channel.send({
                embed: {
                    title: ":x: ERROR",
                    description: `\`\`\`${error}\`\`\``,
                    color: client.config.embed.color,
                }
            }).then(message => {
                resolve(message);
            }).catch(err => {
                reject(err);
            });
        });
    }

    client.editEmbed = (channel, message, title, description, fields, footer, color, thumbnail) => {
        return new Promise(async (resolve, reject) => {
            let m = await channel.messages.fetch(message);
            m.edit({
                embed: {
                    title: title,
                    description: description,
                    fields: fields,
                    thumbnail: { url: thumbnail || "" },
                    color: color || client.config.embed.color,
                    footer: { text: footer || client.config.embed.footer}
                }
            }).then(message => {
                resolve(message);
            }).catch(err => {
                reject(err);
            });
        });
    }

    client.getEmbed = async (channel, message) => {
        // TODO: parse embed
        return await channel.fetchMessage(message);
    }

}