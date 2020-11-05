const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (client, message, args, userConf, guildConf) => {

    const clean = text => {
        if (typeof(text) === "string")
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else {
            return text;
        }
    }

    try {
        const code = args.join(" ");
        code.replace(client.config.token, "[NOPE]");
        let evaled = await eval(code);

        if (typeof evaled !== "string") {
            evaled = require("util").inspect(evaled);
        }

        evaled = clean(evaled);

        if (evaled.length > 2000) {
            evaled = evaled.slice(0, 2000);
            evaled += "\n\n..."
        }

        let m = await client.sendEmbed(message.channel, "OUTPUT", `\`\`\`${evaled}\`\`\``);

    } catch (err) {

        err = clean(err);

        if (err.length > 2000) {
            err = err.slice(0, 2000);
        }

        await client.sendEmbed(message.channel, "ERROR", `\`\`\`${err}\`\`\``);
    }

    return;
}

module.exports.help = {
    name: "eval",
    description: "Run JavaScript code",
    dm: true,
    owner: true,
    aliases: ["ev"]
}