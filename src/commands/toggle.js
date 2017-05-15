const fs = require('fs');
exports.run = (client, msg, args, data, errors) => {
    if (!args[0]) return;
    let botCommander = msg.guild.roles.find("name", "Bot Commander");
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
            if (!botCommander) return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
            if (!msg.member.roles.has(botCommander.id)) return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
            toggleNoNSFW();
        }
    } else

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
            if (!botCommanderCheck) return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
            if (!msg.member.roles.has(botCommander.id)) return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
            toggleNoinvite();
        }
    } else

    if (args[0] === "modlog") {
      function toggleModlog() {
          if (!data[msg.guild.id]) data[msg.guild.id] = {
              "modlog": "disabled"
          };
          if (data[msg.guild.id].modlog === "enabled") {
              data[msg.guild.id].modlog = "disabled";
              let updateValue = JSON.stringify(data, null, 2);
              fs.writeFileSync('./v3/data/data.json', updateValue);
              let modlogChannel = msg.guild.channels.find("name", "mod-log");
              modlogChannel.delete().catch(e => {
                msg.reply(":no_entry_sign: There was an error. Please report this:\n" + e);
              });
              msg.reply("The modlog feature is now **disabled**. I've deleted the channel for it.");
          } else
          if (data[msg.guild.id].modlog === "disabled") {
              data[msg.guild.id].modlog = "enabled";
              let updateValue = JSON.stringify(data, null, 2);
              fs.writeFileSync('./v3/data/data.json', updateValue);
              msg.reply("The modlog feature is now **enabled**.");
              msg.guild.createChannel("mod-log", "text")
              .then(modlog => {
                      modlog.sendMessage("You have enabled the modlog. To disable this and delete this channel, type `;toggle modlog`");
              }).catch(e => {
                msg.channel.sendMessage(":no_entry_sign: There was an error! Report this please:\n" + e);
              });
          } else {
              data[msg.guild.id].modlog = "enabled";
              let updateValue = JSON.stringify(data, null, 2);
              fs.writeFileSync('./v3/data/data.json', updateValue);
              msg.reply("The modlog feature is now **enabled**.");
              msg.guild.createChannel("mod-log", "text")
              .then(modlog => {
                      modlog.sendMessage("You have enabled the modlog. To disable this and delete this channel, type `;toggle modlog`");
              }).catch(e => {
                msg.channel.sendMessage(":no_entry_sign: There was an error! Report this please:\n" + e);
              });
          }
      }
      if (msg.channel.guild.ownerID === msg.author.id) {
          toggleModlog();
      } else {
          if (!botCommander) return msg.reply(errors.sbcErr);
          if (!msg.member.roles.has(botCommander.id)) return msg.reply(errors.ubcErr);
          if (!msg.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) return msg.reply(":no_entry_sign: **Error:** I do not have the **Manage Channels** permission!");
          toggleModlog();
      }
    } else

    if (args[0] === "joinlog") {
      function toggleJoinlog() {
          if (!data[msg.guild.id]) data[msg.guild.id] = {
              "joinlog": "disabled"
          };
          if (data[msg.guild.id].joinlog === "enabled") {
              data[msg.guild.id].joinlog = "disabled";
              let updateValue = JSON.stringify(data, null, 2);
              fs.writeFileSync('./v3/data/data.json', updateValue);
              let joinlogChannel = msg.guild.channels.find("name", "join-log");
              joinlogChannel.delete().catch(e => {
                msg.reply(":no_entry_sign: There was an error. Please report this:\n" + e);
              });
              msg.reply("The joinlog feature is now **disabled**. I've deleted the channel for it.");
          } else
          if (data[msg.guild.id].joinlog === "disabled") {
              data[msg.guild.id].joinlog = "enabled";
              let updateValue = JSON.stringify(data, null, 2);
              fs.writeFileSync('./v3/data/data.json', updateValue);
              msg.reply("The joinlog feature is now **enabled**.");
              msg.guild.createChannel("join-log", "text")
                  setTimeout(() => {
                      joinlog.sendMessage("You have enabled the joinlog. To disable this and delete this channel, type `;toggle joinlog`");
              }).catch(e => {
                msg.channel.sendMessage(":no_entry_sign: There was an error! Report this please:\n" + e);
              });
          } else {
              data[msg.guild.id].joinlog = "enabled";
              let updateValue = JSON.stringify(data, null, 2);
              fs.writeFileSync('./v3/data/data.json', updateValue);
              msg.reply("The joinlog feature is now **enabled**.");
              msg.guild.createChannel("join-log", "text")
              .then(joinlog => {
                      joinlog.sendMessage("You have enabled the joinlog. To disable this and delete this channel, type `;toggle joinlog`");
              }).catch(e => {
                msg.channel.sendMessage(":no_entry_sign: There was an error! Report this please:\n" + e);
              });
          }
      }
      if (msg.channel.guild.ownerID === msg.author.id) {
          toggleJoinlog();
      } else {
          if (!botCommander) return msg.reply(errors.sbcErr);
          if (!msg.member.roles.has(botCommander.id)) return msg.reply(errors.ubcErr);
          if (!msg.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) return msg.reply(":no_entry_sign: **Error:** I do not have the **Manage Channels** permission!");
          toggleJoinlog();
      }
    }
}
