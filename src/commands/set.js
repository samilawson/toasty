const fs = require('fs');
exports.run = (client, msg, args, data, errors) => {
  if (!args[0]) return;
  let command = args[0].toLowerCase();
  args = args.join(" ").substring(command.length + 1);
  let botCommander = msg.guild.roles.find("name", "Bot Commander");
    //joinrole
    if (command === "joinrole") {
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
        if (!msg.member.roles.has(botCommander)) return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
        setJoinrole();
    }
  } else
  //joindm
  if (command === "joindm") {
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
    function setLeavemessage() {
      if (!data[message.guild.id]) data[message.guild.id] = {leaveMessage: "disabled"};
      data[message.guild.id].leaveMessage = args;
      let updateValue = JSON.stringify(data, null, 2);
      fs.writeFileSync('./v3/data/data.json', updateValue);
      msg.reply("I have set the leave message to:\n" + args);
    }
    if(msg.channel.guild.ownerID === msg.author.id) {
      setLeavemessage();
    } else {
      if (!botCommander) return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
      if (!message.member.roles.has(botCommander.id)) return msg.reply(":no_entry_sign: **Error:** You don't have the **Bot Commander** role!");
      setLeavemessage();
    }
  }
}
