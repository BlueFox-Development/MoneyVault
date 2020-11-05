module.exports = async (client, message) => {

    if (message.author.bot) return;

    let args;
    let userConf;
    let guildConf;

    if (message.guild) {
        
        guildConf = client.serverDB.ensure(message.guild.id, client.defaultServerDB);
        userConf = client.userDB.ensure(`${message.author.id}-${message.guild.id}`, {
                guild: message.guild.id,
                user: message.author.id,
                cooldowns: {},
                lastSeen: Date.now()
        });

        client.userDB.set(`${message.author.id}-${message.guild.id}`, Date.now(), "lastSeen");

        if (message.content.indexOf(guildConf.prefix) !== 0) return;
        args = message.content.slice(guildConf.prefix.length).trim().split(/ +/g);

    } else {

        if (message.content.indexOf(client.config.prefix) !== 0) return;
        args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);

    }

    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

    if (client.config.deleteMessage) { await message.delete(); }
    if (!cmd) { return; }
    if (!message.guild && !cmd.help.dm) { await client.sendEmbed(message.channel, "You may only use that command in servers!"); return; }

    if (cmd.help.cooldown != null && !client.isOwner(message)) {

        if (client.hasCooldown(message.author.id, message.guild.id, cmd.help.name)) return await message.react("⏰");
        client.addCooldown(message.author.id, message.guild.id, cmd.help.name, cmd.help.cooldown);

    }

    if (cmd.help.owner === true && !client.isOwner(message)) return

    if (message.guild) {

        try {
            cmd.run(client, message, args, userConf, guildConf);
            client.serverDB.inc(message.guild.id, "commandsRun");
        } catch (e) {
            client.error(4, `Could not run command "${cmd}"\n${e}`);
            return;
        }

    } else {

        try {
            cmd.run(client, message, args);
        } catch (e) {
            client.error(4, `Could not run command "${cmd}"\n${e}`);
            return;
        }

    }

    return;

}