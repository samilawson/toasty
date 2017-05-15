const fs = require('fs');
exports.run = (client, msg, args, data, errors) => {
  if (!args[0]) return;
  let command = args[0].toLowerCase();
  let disable = args[1].toLowerCase();
  args = args.join(" ").substring(command.length + 1);
  let botCommander = msg.guild.roles.find("name", "Bot Commander");

    //joinrole
    if (command === "joinrole") {
      if (disable === "disabled") {
        function disableJoinrole() {
          if (!data[msg.guild.id]) data[msg.guild.id] = {joinRole: "disabled"};
          data[msg.guild.id].joinRole = "disabled";
          let updateValue = JSON.stringify(data, null, 2);
          fs.writeFileSync('./v3/data/data.json', updateValue);
          msg.reply(`I have disabled the join role.`);
        }
        if (msg.channel.guild.ownerID === msg.author.id) {
          return disableJoinrole();
        } else {
          if (!botCommander) return msg.reply(":no_entry_sign: **Error:** There is no **Bot Commander** role on this server!\nPlease create one and give it to anyone who should be able to use these commands.");
          if (!msg.member.roles.has(botCommander.id)) return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
          return disableJoinrole();
        }
      }
      function setJoinrole() {
        if (!data[msg.guild.id]) data[msg.guild.id] = {joinRole: "disabled"};
        data[msg.guild.id].joinRole = args;
        let updateValue = JSON.stringify(data, null, 2);
        fs.writeFileSync('./v3/data/data.json', updateValue);
        msg.reply(`I have set the join role to, **${args}**.`);
      }
      if(msg.channel.guild.ownerID === msg.author.id) {
        setJoinrole();
      } else {
        if (!botCommander) return msg.reply(":no_entry_sign: **Error:** There is no **Bot Commander** role on this server!\nPlease create one and give it to anyone who should be able to use these commands.");
        if (!msg.member.roles.has(botCommander.id)) return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
        setJoinrole();
    }
  } else
  //joindm
  if (command === "joindm") {
    if (disable === "disabled") {
      function disableJoindm() {
        if (!data[msg.guild.id]) data[msg.guild.id] = {joinDM: "disabled"};
        data[msg.guild.id].joinDM = "disabled";
        let updateValue = JSON.stringify(data, null, 2);
        fs.writeFileSync('./v3/data/data.json', updateValue);
        msg.reply(`I have disabled the join DM.`);
      }
      if (msg.channel.guild.ownerID === msg.author.id) {
        return disableJoindm();
      } else {
        if (!botCommander) return msg.reply(":no_entry_sign: **Error:** There is no **Bot Commander** role on this server!\nPlease create one and give it to anyone who should be able to use these commands.");
        if (!msg.member.roles.has(botCommander.id)) return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
        return disableJoindm();
      }
    }
    function setJoindm() {
      if (!data[msg.guild.id]) data[msg.guild.id] = {joinDM: "disabled"};
      data[msg.guild.id].joinDM = args;
      let updateValue = JSON.stringify(data, null, 2);
      fs.writeFileSync('./v3/data/data.json', updateValue);
      msg.reply("I have set the join DM to\n" + args);
    }
    if(msg.channel.guild.ownerID === msg.author.id) {
      setJoindm();
    } else {
      if (!botCommander) return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
      if (!msg.member.roles.has(botCommander.id)) return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
      setJoindm();
    }
  } else
  //joinmessage
  if (command === "joinmessage") {
    if (disable === "disabled") {
      function disableJoinmessage() {
        if (!data[msg.guild.id]) data[msg.guild.id] = {joinMessage: "disabled"};
        data[msg.guild.id].joinMessage = "disabled";
        let updateValue = JSON.stringify(data, null, 2);
        fs.writeFileSync('./v3/data/data.json', updateValue);
        msg.reply(`I have disabled the join message.`);
      }
      if (msg.channel.guild.ownerID === msg.author.id) {
        return disableJoinmessage();
      } else {
        if (!botCommander) return msg.reply(":no_entry_sign: **Error:** There is no **Bot Commander** role on this server!\nPlease create one and give it to anyone who should be able to use these commands.");
        if (!msg.member.roles.has(botCommander.id)) return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
        return disableJoinmessage();
      }
    }
    function setJoinmessage() {
      if (!data[msg.guild.id]) data[msg.guild.id] = {joinMessage: "disabled"};
      data[msg.guild.id].joinMessage = args
      let updateValue = JSON.stringify(data, null, 2);
      fs.writeFileSync('./v3/data/data.json', updateValue);
      msg.reply("I have set the join message to\n" + args);
    }
    if(msg.channel.guild.ownerID === msg.author.id) {
      setJoinmessage();
    } else {
      if (!botCommander) return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
      if (!msg.member.roles.has(botCommander.id)) return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
      setJoinmessage();
    }
  } else
  //leavemessage
  if (command === "leavemessage") {
    if (disable === "disabled") {
      function leaveMessage() {
        if (!data[msg.guild.id]) data[msg.guild.id] = {leaveMessage: "disabled"};
        data[msg.guild.id].leaveMessage = "disabled";
        let updateValue = JSON.stringify(data, null, 2);
        fs.writeFileSync('./v3/data/data.json', updateValue);
        msg.reply(`I have disabled the leave message.`);
      }
      if (msg.channel.guild.ownerID === msg.author.id) {
        return disableLeavemessage();
      } else {
        if (!botCommander) return msg.reply(":no_entry_sign: **Error:** There is no **Bot Commander** role on this server!\nPlease create one and give it to anyone who should be able to use these commands.");
        if (!msg.member.roles.has(botCommander.id)) return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
        return disableLeavemessage();
      }
    }
    function setLeavemessage() {
      if (!data[msg.guild.id]) data[msg.guild.id] = {leaveMessage: "disabled"};
      data[msg.guild.id].leaveMessage = args;
      let updateValue = JSON.stringify(data, null, 2);
      fs.writeFileSync('./v3/data/data.json', updateValue);
      msg.reply("I have set the leave message to:\n" + args);
    }
    if(msg.channel.guild.ownerID === msg.author.id) {
      setLeavemessage();
    } else {
      if (!botCommander) return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
      if (!msg.member.roles.has(botCommander.id)) return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
      setLeavemessage();
    }
  }
}
