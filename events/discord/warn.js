const Discord = require("discord.js");

module.exports = (client, e) => {

    client.error(2, e);
    console.warn(`Warning: ${e}`);

}