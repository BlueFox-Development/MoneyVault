const Discord = require("discord.js");

module.exports = (client, e) => {

    client.error(4, e);
    console.error(`Error: ${e}`);

}