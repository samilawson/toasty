const fs = require('fs');
exports.run = (client, msg, args, data, errors) => {
  if (args[0]) return;
    let command = args[0].toLowerCase();
    args = args.join(" ").substring(command.length + 1);
    let guildName = msg.guild.id;
    let botCommander = msg.guild.roles.find("name", "Bot Commander");

    //joinrole
    if (command === "joinrole") {
        function disableJoinrole() {
            if (!data[msg.guild.id]) data[msg.guild.id] = {
                joinRole: "disabled"
            };
            let guildName = msg.guild.id;
            data[msg.guild.id].joinRole = "disabled";
            let updateValue = JSON.stringify(data, null, 2);
            fs.writeFileSync('./v3/data/data.json', updateValue);
            msg.reply("I have disabled the join role.");
        }
        if (msg.channel.guild.ownerID === msg.author.id) {
            disableJoinrole();
        } else {
            if (!botCommander) return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
            if (!msg.member.roles.has(botCommander.id)) return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
            disableJoinrole();
        }
    } else
        //joindm
        if (command === "joindm") {

            function disableJoindm() {
                if (!data[msg.guild.id]) data[msg.guild.id] = {
                    joinDM: "disabled"
                };
                data[msg.guild.id].joinDM = "disabled";
                let updateValue = JSON.stringify(data, null, 2);
                fs.writeFileSync('./v3/data/data.json', updateValue);
                msg.reply("I have disabled the join DM.");
            }
            if (msg.channel.guild.ownerID === msg.author.id) {
                disableJoindm();
            } else {
                if (!botCommander) return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
                if (!msg.member.roles.has(botCommander.id)) {
                    return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
                }
                disableJoindm();
            }
        } else
            //joinmessage
            if (command === "joinmessage") {

                function disableJoinmessage() {
                    if (!data[msg.guild.id]) data[msg.guild.id] = {
                        joinMessage: "disabled"
                    };
                    data[msg.guild.id].joinMessage = "disabled";
                    let updateValue = JSON.stringify(data, null, 2);
                    fs.writeFileSync('./v3/data/data.json', updateValue);
                    msg.reply("I have disabled the join message.");
                }
                if (msg.channel.guild.ownerID === msg.author.id) {
                    disableJoinmessage();
                } else {
                    if (!botCommander) return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
                    if (!msg.member.roles.has(botCommander.id)) return msg.reply("`Error:` You don't have the `Bot Commander` role!");
                    disableJoinmessage();
                }
            } else
                //leavemessage
                if (command === "leavemessage") {

                    function disableLeavemessage() {
                        if (!data[msg.guild.id]) data[msg.guild.id] = {
                            leaveMessage: "disabled"
                        };
                        data[msg.guild.id].leaveMessage = "disabled";
                        let updateValue = JSON.stringify(data, null, 2);
                        fs.writeFileSync('./v3/data/data.json', updateValue);
                        msg.reply("I have disabled the leave message.");
                    }
                    if (msg.channel.guild.ownerID === msg.author.id) {
                        disableLeavemessage();
                    } else {
                        if (!botCommander) return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
                        if (!msg.member.roles.has(botCommander.id)) return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
                        disableLeavemessage();
                    }
                } else
                    //joinlog
                    if (command === "joinlog") {

                        if (cooldownUsers.includes(userToCooldown)) {
                            msg.reply(":no_entry_sign: Please wait a few seconds before using this command again!");
                        } else {
                            cooldownUsers.push(userToCooldown);
                            var index = cooldownUsers.indexOf(userToCooldown);
                            setTimeout(() => {
                                cooldownUsers.splice(index, 1)
                            }, 5000);
                            if (!botCommander) return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
                            if (!msg.member.roles.has(botCommander.id)) return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
                            if (!msg.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) return msg.reply(":no_entry_sign: **Error:** I do not have the **Manage Channels** permission!");
                            if (!data[msg.guild.id]) data[msg.guild.id] = {
                                "joinlog": "enabled"
                            };
                            if (!data[msg.guild.id].joinlog) {
                                msg.reply(":no_entry_sign: **Error:** You don't have the join log enabled.");
                            } else if (data[msg.guild.id].joinlog !== "disabled") {
                                data[msg.guild.id].joinlog = "disabled";
                                let updateValue = JSON.stringify(data, null, 2);
                                fs.writeFileSync('./v3/data/data.json', updateValue);
                                let joinlogdelete = msg.guild.channels.find("name", "join-log");
                                joinlogdelete.delete()
                                    .then()
                                msg.reply("I've disabled the join log and deleted the channel for it.");
                            } else {
                                msg.reply(":no_entry_sign: **Error:** You don't have the join log enabled.");
                            }
                        }
                    } else
                        //modlog
                        if (command === "modlog") {
                            if (cooldownUsers.includes(userToCooldown)) {
                                msg.reply(":no_entry_sign: Please wait a few seconds before using this command again!");
                            } else {
                                cooldownUsers.push(userToCooldown);
                                var index = cooldownUsers.indexOf(userToCooldown);
                                setTimeout(() => {
                                    cooldownUsers.splice(index, 1)
                                }, 5000);
                                if (!botCommander) return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
                                if (!msg.member.roles.has(botCommander.id)) return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
                                if (!msg.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) return msg.reply(":no_entry_sign: **Error:** I do not have the **Manage Channels** permission!");
                                if (!data[msg.guild.id]) data[msg.guild.id] = {
                                    "modlog": "enabled"
                                };
                                if (!data[msg.guild.id].modlog) {
                                    msg.reply(":no_entry_sign: **Error:** You don't have the mod log enabled.");
                                } else if (data[msg.guild.id].modlog !== "disabled") {
                                    data[msg.guild.id].modlog = "disabled";
                                    let updateValue = JSON.stringify(data, null, 2);
                                    fs.writeFileSync('./v3/data/data.json', updateValue);
                                    let modlogdelete = msg.guild.channels.find("name", "mod-log");
                                    modlogdelete.delete()
                                        .then()
                                    msg.reply("I've disabled the mod log and deleted the channel for it.");
                                } else {
                                    msg.reply(":no_entry_sign: **Error:** You don't have the mod log enabled.");
                                }
                            }
                        } else {
                            return;
                        }
}
