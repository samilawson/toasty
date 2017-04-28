const fs = require('fs');
exports.run = (client, msg, args, data, errors) => {
    if (!args[0]) return;
    let command = args[0].toLowerCase();
    args = args.join(" ").substring(command.length + 1);
    let guildName = msg.guild.id;
    let botCommander = msg.guild.roles.find("name", "Bot Commander");

    //joinrole
    if(command === "joinrole") {
      if (!botCommander) return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
      if (!msg.member.roles.has(botCommander.id)) return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
      if (!msg.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) return msg.reply(":no_entry_sign: **Error:** I do not have the **Manage Channels** permission!");
      let data = JSON.parse(fs.readFileSync('./v3/data/data.json', 'utf-8'));
      if (!data[msg.guild.id]) data[msg.guild.id] = {
          joinlog: "disabled"
      };
      data[msg.guild.id].joinlog = "enabled";
      let updateValue = JSON.stringify(data, null, 2);
      fs.writeFileSync('./v3/data/data.json', updateValue);
      msg.reply("I have enabled the join log.");
      msg.guild.createChannel("join-log", "text")
          .then(joinlog => {
              setTimeout(() => {
                  joinlog.sendMessage("You have enabled the join log. To disable it and delete this channel, type `;disable joinlog`");
              }, 2500);
          }).catch(e => {
            msg.channel.sendMessage(":no_entry_sign: There was an error! Report this please:\n\n" + e);
          });
    } else
    //modlog
    if (command === "modlog") {
      if (!botCommander) return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
      if (!msg.member.roles.has(botCommander.id)) return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
      if (!msg.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) return msg.reply(":no_entry_sign: **Error:** I do not have the **Manage Channels** permission!");
      let data = JSON.parse(fs.readFileSync('./v3/data/data.json', 'utf-8'));
      if (!data[msg.guild.id]) data[msg.guild.id] = {
          modlog: "disabled"
      };
      data[msg.guild.id].modlog = "enabled";
      let updateValue = JSON.stringify(data, null, 2);
      fs.writeFileSync('./v3/data/data.json', updateValue);
      msg.reply("I have enabled the modlog.");
      msg.guild.createChannel("mod-log", "text")
          .then(modlog => {
              setTimeout(() => {
                  modlog.sendMessage("You have enabled the mod log. To disable this and delete this channel, type `;disable modlog`");
              }, 2500);
          }).catch(e => {
            msg.channel.sendMessage(":no_entry_sign: There was an error! Report this please:\n\n" + e);
          });
    }
}
