const Discord = require("discord.js");

module.exports = (error) => {

    client.error(4, error);
    console.error(`Client's WebSocket encountered a connection error: ${error}`);

}
