const moment = require('moment');
const fs = require("fs");
const Discord = require('discord.js');

module.exports = (client) => {

    client.log = (title, msg) => {
        let time = moment().format(client.config.timeFormat);
        if (!title) return;
        let format = `[${time}] [${title}] ${msg}`;
        console.log(format);

        let date = new Date();
        let dir = `./logs/${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`;
        if (!fs.existsSync(dir)) { fs.mkdirSync(dir); }

        fs.appendFile(`${dir}/${title.toLowerCase()}.txt`, `${format}\n`, (err) => {
            if (err) console.error(err);
        });

    }

    client.error = (severity, error) => {

        switch (severity) {
            case 0:
                // Messages that contain information normally
                // of use only when debugging a program
                severity = "DEBUG";
            case 1:
                // Informational messages
                severity = "INFO";
            case 2:
                // Warning conditions
                severity = "WARNING";
            case 3:
                // A condition that should be corrected
                // immediately, such as a corrupted system database
                severity = "ALERT";
            case 4:
                // Error conditions
                severity = "ERROR";
            case 5:
                // Conditions that are not error conditions,
                // but that may require special handling
                severity = "EMERGENCY"
        }

        let date = new Date();
        let dir = `./logs/${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`;
        if (!fs.existsSync(dir)) { fs.mkdirSync(dir); }

        fs.appendFile(`${dir}/errors.txt`, `[${severity}] => ${error}\n`, (err) => {
            if (err) console.error(err);
        });

        return error;

    }

}