const Discord = require('discord.js');
exports.run = (client, msg, args, data, errors) => {
    const embed = new Discord.RichEmbed();
    if (!msg.member.hasPermission("KICK_MEMBERS")) return msg.reply(":no_entry_sign: **Error:** You don't have the **Kick Members** permission!");
    if (msg.mentions.users.size === 0) return msg.reply(":no_entry_sign: Please mention a user to kick.");
    let userToKick = msg.guild.member(msg.mentions.users.first());
    if (!userToKick) return msg.channel.sendMessage(":no_entry_sign: **Error:** That user does not seem valid.");
    if (!msg.guild.member(client.user).hasPermission("KICK_MEMBERS")) return msg.channel.sendMessage(":no_entry_sign: **Error:** I don't have the **Kick Members** permission!");
    let modlogData = data[msg.guild.id] ? data[msg.guild.id] : {modlog: "disabled"};
    if (!modlogData.modlog) {
        userToKick.kick().then(kicked => {
            msg.channel.sendMessage(`**${kicked.user.username}** has been kicked.`);
        }).catch(err => { msg.channel.sendMessage(":no_entry_sign: **Error:**\n" + err); });
    } else if (modlogData.modlog === "disabled") {
        userToKick.kick().then(kicked => {
            msg.channel.sendMessage(`**${kicked.user.username}** has been kicked.`);
        }).catch(err => { msg.channel.sendMessage(":no_entry_sign: **Error:**\n" + err); });
    } else {
        let modlogchannel = msg.guild.channels.find("name", "mod-log").id;
        userToKick.kick().then(kicked => {
            msg.channel.sendMessage(`**${kicked.user.username}** has been kicked. I've logged it in the mod log.`);
        }).catch(err => { msg.channel.sendMessage(":no_entry_sign: **Error:**\n" + err); });
        let today = new Date();
        let date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        embed.setColor(0xFFA500)
            .setAuthor(msg.mentions.users.first().username, msg.mentions.users.first().avatarURL)
            .setTitle("User Kicked:")
            .setDescription(`${msg.mentions.users.first().username}#${msg.mentions.users.first().discriminator} (${msg.mentions.users.first().id})`)
            .addField(`Reason: `, args.join(' '))
            .addField(`Responsible Moderator: `, `${msg.author.username}#${msg.author.discriminator} (${msg.author.id})`)
            .setFooter(date + ` at ` + time)
        client.channels.get(modlogchannel).sendEmbed(embed);
    }
}
