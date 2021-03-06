const { RichEmbed } = require('discord.js');
const fs = require('fs');
const path = require('path');

exports.run = (client, member) => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data/servers.json')));
  const guild = member.guild;

  if (!data[guild.id]) data[guild.id] = {"leaveMessage": "disabled"};
  if (data[guild.id].leaveMessage && data[guild.id].leaveMessage !== 'disabled') {
    let leaveMessage = data[guild.id].leaveMessage;
    if (leaveMessage.includes('{user}')) {
      let message = leaveMessage.replace('{user}', member.user);
      guild.defaultChannel.send(message);
    } else {
      guild.defaultChannel.send(leaveMessage);
    }
  }

  if (!data[guild.id]) data[guild.id] = {"joinlog": "disabled"};
  if (data[guild.id].joinlog && data[guild.id].joinlog === 'enabled') {
    let embed = new RichEmbed();
    let today = new Date();
    let date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
    let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    if (member.user.bot === true) {
      embed.setColor(0xFF0000)
           .setAuthor(member.user.username, member.user.avatarURL)
           .setTitle('Bot Left:')
           .setDescription(`- ${member.user.username}#${member.user.discriminator} (${member.user.id})`)
           .setFooter(date + ` at ` + time);
      guild.channels.find('name', 'join-log').send({ embed }).catch((e) => console.log('Caught.'));
    } else {
      embed.setColor(0xFF0000)
           .setAuthor(member.user.username, member.user.avatarURL)
           .setTitle('User Left:')
           .setDescription(`- ${member.user.username}#${member.user.discriminator} (${member.user.id})`)
           .setFooter(date + ` at ` + time);
      guild.channels.find('name', 'join-log').send({ embed }).catch((e) => console.log('Caught.'));
    }
  }
}
