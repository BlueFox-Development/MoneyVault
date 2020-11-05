/*

 Made by: FlaringPhoenix#0001

*/

// Do not change
let version = "1.0.0";
let author = "FlaringPhoenix#0001";

// Basic options (all required)
let botName = "MoneyVault";
let owners = ["707022994421186651"];
let permissions = "11328";
let id = "768907982376402955";

// Token
let token = "";

// Time format for console logging
let timeFormat = "HH:mm:ss";

// Default bot prefix
let prefix = "m!";

// Your server links
let links = {
    discord: "https://discord.gg/Ef9Tvs4",
    website: "https://bluefoxhost.com"
}

// Default embed options
let embed = {
    color: "#00ff00",
    footer: "MoneyVault | m!help"
}

// Toggle command trigger message
let deleteCommands = false;

// If a command is disabled the bot will ignore it
let disabledCommands = [];

// Toggle logging messages in console
let log = {
    commands: true,
    errors: true,
}

module.exports = {
    version,
    author,
    botName,
    owners,
    permissions,
    token,
    timeFormat,
    prefix,
    links,
    embed,
    deleteCommands,
    disabledCommands,
    log,
}