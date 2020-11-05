const Discord = require('discord.js');

module.exports = (client, guildConf, message) => {

    // TODO: redo this entirely

    client.addCooldown = (userid, guildid, command, time) => {

        let cooldowns = client.userDB.get(`${userid}-${guildid}`, "cooldowns")

        function set(path, value) {
            let pList = path.split('.');
            let len = pList.length;
            for (let i = 0; i < len-1; i++) {
                let elem = pList[i];
                if ( !cooldowns[elem] ) cooldowns[elem] = {}
                cooldowns = cooldowns[elem];
            }
            cooldowns[pList[len-1]] = value;
        }

        set(command, Date.now()+(time*1000));
        client.userDB.set(`${userid}-${guildid}`, "cooldowns", cooldowns);

    }

    client.hasCooldown = (userid, guildid, command) => {

        let cooldowns = client.userDB.get(`${userid}-${guildid}`, "cooldowns")
        if (cooldowns[command] === undefined) { return false; }

        if (Date.now() > cooldowns[command]) {
            delete cooldowns[command];
            client.userDB.set(`${userid}-${guildid}`, "cooldowns", cooldowns);
            return false;
        }

        return true;
    }

    client.resetCooldown = (userid, guildid, command) => {

        let cooldowns = client.userDB.get(`${userid}-${guildid}`, "cooldowns")
        delete cooldowns[command];
        client.userDB.set(`${userid}-${guildid}`, "cooldowns", cooldowns);

    }

    client.resetCooldowns = (userid) => {

        //TODO

    }


}