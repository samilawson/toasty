const fs = require('fs');
exports.run = (client, msg, args, data, errors) => {
  if (!args[0]) return;
    if (args[0] === "nonsfw") {
        function toggleNoNSFW() {
            if (!data[msg.guild.id]) data[msg.guild.id] = {
                "nonsfw": "disabled"
            };
            if (data[msg.guild.id].nonsfw === "enabled") {
                data[msg.guild.id].nonsfw = "disabled";
                let updateValue = JSON.stringify(data, null, 2);
                fs.writeFileSync('./v3/data/data.json', updateValue);
                msg.reply("The no NSFW feature is now **disabled**.");
            } else
            if (data[msg.guild.id].nonsfw === "disabled") {
                data[msg.guild.id].nonsfw = "enabled";
                let updateValue = JSON.stringify(data, null, 2);
                fs.writeFileSync('./v3/data/data.json', updateValue);
                msg.reply("The no NSFW feature is now **enabled**.");
            } else {
                data[msg.guild.id].nonsfw = "enabled";
                let updateValue = JSON.stringify(data, null, 2);
                fs.writeFileSync('./v3/data/data.json', updateValue);
                msg.reply("The no NSFW feature is now **enabled**.");
            }
        }
        if (msg.channel.guild.ownerID === msg.author.id) {
            toggleNoNSFW();
        } else {
            let botCommanderCheck = msg.guild.roles.find("name", "Bot Commander");
            if (!botCommanderCheck) return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
            let botCommander = msg.guild.roles.find("name", "Bot Commander").id;
            if (!msg.member.roles.has(botCommander)) {
                return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
            }
            toggleNoNSFW();
        }
    }

    if (args[0] === "noinvite") {
        function toggleNoinvite() {
            if (!data[msg.guild.id]) data[msg.guild.id] = {
                "noinvite": "disabled"
            };
            if (data[msg.guild.id].noinvite === "enabled") {
                data[msg.guild.id].noinvite = "disabled";
                let updateValue = JSON.stringify(data, null, 2);
                fs.writeFileSync('./v3/data/data.json', updateValue);
                msg.reply("The no invite feature is now **disabled**.");
            } else
            if (data[msg.guild.id].noinvite === "disabled") {
                data[msg.guild.id].noinvite = "enabled";
                let updateValue = JSON.stringify(data, null, 2);
                fs.writeFileSync('./v3/data/data.json', updateValue);
                msg.reply("The no invite feature is now **enabled**.");
            } else {
                data[msg.guild.id].noinvite = "enabled";
                let updateValue = JSON.stringify(data, null, 2);
                fs.writeFileSync('./v3/data/data.json', updateValue);
                msg.reply("The no invite feature is now **enabled**.");
            }
        }
        if (msg.channel.guild.ownerID === msg.author.id) {
            toggleNoinvite();
        } else {
            let botCommanderCheck = msg.guild.roles.find("name", "Bot Commander");
            if (!botCommanderCheck) return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
            let botCommander = msg.guild.roles.find("name", "Bot Commander").id;
            if (!msg.member.roles.has(botCommander)) {
                return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
            }
            toggleNoinvite();
        }
    }
}
