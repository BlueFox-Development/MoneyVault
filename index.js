// Start time
let startDate = new Date();

// Bot Dependencies
const Discord = require("discord.js");
const fs = require("fs");
require('moment-duration-format');
const Enmap = require("enmap")

// Create client
const client = new Discord.Client();

// Loads config.js
config = require('./config.js');
client.config = config;

// Start time
client.startDate = startDate;

client.serverDB = new Enmap({
    name: "servers",
    fetchAll: true,
    autoFetch: true,
    dataDir: "./database/servers/",
    cloneLevel: 'deep'
});

client.userDB = new Enmap({
    name: "users",
    fetchAll: true,
    autoFetch: true,
    dataDir: "./database/users/",
    cloneLevel: 'deep'
});

// Sets default settings for each server
const defaultServerDB = {
    commandsRun: 0,
    prefix: client.config.prefix,
    giveaways: [],
    giveawayLogChannel: null
}

client.defaultServerDB = defaultServerDB;

// Categories of commands
const modules = [ 'general', 'owner', 'giveaway' ];
client.modules = modules;

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

// Load modules
fs.readdir(`${process.cwd()}/modules/`, (err, files) => {
    if (err) { throw err }
    for (const file of files) {
        if (!file.endsWith(".js")) continue;
        require(`${process.cwd()}/modules/${file}`)(client);
    }
    client.log("BOT", "Starting...");
    client.log("BOT", "Loaded modules");

    // Load discord events
    client.loadEvents("discord");

    // Load process events
    client.loadEvents("process");

    // Load commands
    client.loadCommands();
});


// Log into client
try {
    client.login(client.config.token);
} catch(e) {
    console.error(`Invalid token: ${e}`);
    return;
}