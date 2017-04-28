const Discord = require('discord.js');
exports.run = (client, msg, args, data, errors) => {
        const embed = new Discord.RichEmbed();
        if (!msg.member.hasPermission("BAN_MEMBERS")) return msg.reply(":no_entry_sign: **Error:** You don't have the **Ban Members** permission!");
        if (msg.mentions.users.size === 0) return msg.reply(":no_entry_sign: Please mention a user to ban.");
        let userToBan = msg.guild.member(msg.mentions.users.first());
        if (!userToBan) return msg.channel.sendMessage(":no_entry_sign: **Error:** That user does not seem valid.");
        if (!msg.guild.member(client.user).hasPermission("BAN_MEMBERS")) return msg.channel.sendMessage(":no_entry_sign: **Error:** I don't have the **Ban Members** permission!");
        let modlogData = data[msg.guild.id] ? data[msg.guild.id] : {modlog: "disabled"};
        if (!data.modlog) {
            userToBan.ban();
            msg.channel.sendMessage("**" + msg.mentions.users.first().username + "** has been banned!");
        } else if (data.modlog === "disabled") {
            userToBan.ban();
            msg.channel.sendMessage("**" + msg.mentions.users.first().username + "** has been banned!");
        } else {
            let modlogchannel = msg.guild.channels.find("name", "mod-log").id;
            userToBan.ban();
            msg.reply("**" + msg.mentions.users.first().username + "** has been banned. I've logged it in the mod log.");
            let today = new Date();
            let date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            embed.setColor(0xFF0000)
                .setAuthor(msg.mentions.users.first().username, msg.mentions.users.first().avatarURL)
                .setTitle("User Banned:")
                .setDescription(`${msg.mentions.users.first().username}#${msg.mentions.users.first().discriminator} (${msg.mentions.users.first().id})`)
                .addField(`Reason: `, args.join(' '))
                .addField(`Responsible Moderator: `, `${msg.author.username}#${msg.author.discriminator} (${msg.author.id})`)
                .setFooter(date + ` at ` + time)
            client.channels.get(modlogchannel).sendEmbed(embed);
      }
}
