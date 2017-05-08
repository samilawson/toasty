const Discord = require('discord.js');
exports.run = (client, msg, args, data, errors) => {
    const embed = new Discord.RichEmbed();
    if (!msg.member.hasPermission("KICK_MEMBERS")) return msg.reply(":no_entry_sign: **Error:** You don't have enough permissions! *This command requires at least Kick Members permission*");
    if (msg.mentions.users.size === 0) return msg.reply(":no_entry_sign: Please mention a user to warn.");
    let userToWarn = msg.guild.member(msg.mentions.users.first());
    if (!userToWarn) return msg.channel.sendMessage(":no_entry_sign: **Error:** That user does not seem valid.");
    let modlogData = data[msg.guild.id] ? data[msg.guild.id] : {modlog: "disabled"};
    if (!data[msg.guild.id].modlog) {
        msg.reply("You can not use this command without the modlog enabled.");
    } else if (data[msg.guild.id].modlog === "disabled") {
        msg.reply("You can not use this command without the modlog enabled.");
    } else {
        let modlogchannel = msg.guild.channels.find("name", "mod-log").id;
        msg.channel.sendMessage(userToWarn + ", **this is a warning!** Reason: " + args.join(' '));
        let today = new Date();
        let date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        embed.setColor(0xFFFF00)
            .setAuthor(msg.mentions.users.first().username, msg.mentions.users.first().avatarURL)
            .setTitle("User Warned:")
            .setDescription(`${msg.mentions.users.first().username}#${msg.mentions.users.first().discriminator} (${msg.mentions.users.first().id})`)
            .addField(`Reason: `, args.join(' '))
            .addField(`Responsible Moderator: `, `${msg.author.username}#${msg.author.discriminator} (${msg.author.id})`)
            .setFooter(date + ` at ` + time)
        client.channels.get(modlogchannel).sendEmbed(embed);
    }
}
