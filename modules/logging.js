const moment = require('moment');
const fs = require("fs");
const Discord = require('discord.js');

module.exports = (client) => {

    client.log = (title, msg) => {
        let time = moment().format(client.config.timeFormat);
        if (!title || !msg) return;
        let format = `[${time}-CST] [${title}] ${msg}`;
        console.log(format);

        let date = new Date();
        let dir = `./logs/${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`;
        if (!fs.existsSync(dir)) { fs.mkdirSync(dir); }

        fs.appendFile(`${dir}/${title.toLowerCase()}.txt`, `${format}\n`, (err) => {
            if (err) console.error(err);
        });

    }

    client.error = (level, error) => {

        let severity = null;

        if (level === 0) {
            severity = "DEBUG";
        } else if (level === 1) {
            severity = "INFO";
        } else if (level === 2) {
            severity = "WARNING";
        } else if (level === 3) {
            severity = "ALERT";
        } else if (level === 4) {
            severity = "ERROR";
        } else if (level === 5) {
            severity = "EMERGENCY";
        } else {
            severity = "UNKNOWN";
        }

        let date = new Date();
        let dir = `./logs/${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`;
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);

        dir = `${dir}/errors/`;
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);

        let time = moment().format(client.config.timeFormat);
        let format = `[${time}-CST] [${severity}] ${error}\n`;

        fs.appendFile(`${dir}/${severity.toLowerCase()}.txt`, format, (err) => {
            if (err) console.error(err);
        });

        return error;

    }

}