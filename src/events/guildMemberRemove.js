const fs = require('fs'),
      data = JSON.parse(fs.readFileSync('./v3/data/data.json', 'utf8')),
      Discord = require('discord.js');
exports.run = (client, member) => {
    const embed = new Discord.RichEmbed();
    let guild = member.guild;

    //leave message
    if (!data[guild.id]) data[guild.id] = {"leaveMessage": "disabled"};
    if (!data[guild.id].leaveMessage) return;
    if (data[guild.id].leaveMessage !== "disabled") {
        if (data[guild.id].leaveMessage.includes('{user}')) {
            let leaveMessage = data[guild.id].leaveMessage;
            let leave = leaveMessage.replace("{user}", member.user);
            guild.defaultChannel.sendMessage(`${leave}`);
        } else {
            guild.defaultChannel.sendMessage(data[guild.id].leaveMessage);
        }
    }

    //joinlog
    if (!data[guild.id]) data[guild.id] = {"joinlog": "disabled"};
    if (!data[guild.id].joinlog) return;
    if (data[guild.id].joinlog === "enabled") {
        if (member.user.bot === true) {
            let embed = new Discord.RichEmbed();
            let today = new Date();
            let date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            embed.setColor(0xFF0000)
                .setAuthor(member.user.username, member.user.avatarURL)
                .setTitle("Bot Left:")
                .setDescription(`- ${member.user.username}#${member.user.discriminator} (${member.user.id})`)
                .setFooter(date + ` at ` + time)
            guild.channels.find("name", "join-log").sendEmbed(embed);
        } else {
            let embed = new Discord.RichEmbed();
            let today = new Date();
            let date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            embed.setColor(0xFF0000)
                .setAuthor(member.user.username, member.user.avatarURL)
                .setTitle("User Left:")
                .setDescription(`- ${member.user.username}#${member.user.discriminator} (${member.user.id})`)
                .setFooter(date + ` at ` + time)
            guild.channels.find("name", "join-log").sendEmbed(embed);
        }
    } else {
        return;
    }
}
