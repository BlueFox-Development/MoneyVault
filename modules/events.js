const fs = require("fs");

module.exports = (client) => {

    client.loadEvents = (type) => {
        if (type === "discord") {
            try {
                fs.readdir(`${process.cwd()}/events/discord/`, (err, files) => {
                    if (err) throw err
                    for (const file of files) {
                        if (!file.endsWith(".js")) continue;
                        let event = require(`${process.cwd()}/events/discord/${file}`);
                        let eventName = file.split(".")[0];
                        client.on(eventName, event.bind(null, client));
                        delete require.cache[require.resolve(`${process.cwd()}/events/discord/${file}`)];
                    }
                });
            } catch (e) {
                return client.error(5, `Could not load discord events\n${e}`);
            } finally {
                client.log("BOT", `Loaded discord events`);
            }
        } else if (type === "process") {
            try {
                fs.readdir(`${process.cwd()}/events/process`, (err, files) => {
                    if (err) throw err
                    for (const file of files) {
                        if (!file.endsWith(".js")) continue;
                        let event = require(`${process.cwd()}/events/process/${file}`);
                        let eventName = file.split(".")[0];
                        process.on(eventName, event.bind(null, client));
                        delete require.cache[require.resolve(`${process.cwd()}/events/process/${file}`)];
                    }
                });
            } catch(e) {
                return client.error(5, `Could not load process events\n${e}`);
            } finally {
                client.log("BOT", `Loaded process events`);
            }
        }
    };

}