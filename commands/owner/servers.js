const Discord = require("discord.js");
const PastebinAPI = require('pastebin-js');

exports.run = (client, message, args) => {

    let key = client.config.api.pastebin;

    const pastebin = new PastebinAPI({
        'api_dev_key' : key
    });

    let servers = "";

    client.guilds.cache.forEach(g => {
        servers = servers + `${g.name} ► Users: ${g.memberCount}\n`;
    });

    pastebin.createPaste("Servers: \n" + servers, "Servers")
        .then(function (data) {
            // paste succesfully created, data contains the id
            return client.sendEmbed(message.channel, "Success!", `[Click Here](${data})`);
        }).fail(function (err) {console.log(err);})

}

module.exports.help = {
    name: "servers",
    description: "Generates a pastebin link with all the current guilds",
    dm: true,
    owner: true,
    aliases: []
}