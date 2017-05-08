const fs = require('fs'),
      data = JSON.parse(fs.readFileSync('./v3/data/data.json', 'utf8')),
      Discord = require('discord.js');
exports.run = (client, member) => {
    let guild = member.guild;

    if (!data[guild.id]) data[guild.id] = {
        "joinDM": "disabled"
    };
        if (data[guild.id].joinDM && data[guild.id].joinDM !== "disabled") member.sendMessage(data[guild.id].joinDM);

    if (!data[guild.id]) data[guild.id] = {
        "joinMessage": "disabled"
    };
        if (data[guild.id].joinMessage && data[guild.id].joinMessage !== "disabled") {
            if (data[guild.id].joinMessage.includes('{user}')) {
                let joinMessage = data[guild.id].joinMessage;
                let join = joinMessage.replace("{user}", member.user);
                guild.defaultChannel.sendMessage(join);
            } else {
                guild.defaultChannel.sendMessage(data[guild.id].joinMessage);
            }
        }

    if (!data[guild.id]) data[guild.id] = {
        "joinRole": "disabled",
        "joinlog": "disabled"
    };
        if (data[guild.id].joinRole && data[guild.id].joinRole !== "disabled") {
            let promoteRoleCheck = guild.roles.find("name", data[guild.id].joinRole);
            if (!promoteRoleCheck) return guild.defaultChannel.sendMessage(`:no_entry_sign: **Error:** Couldn't add join role. Reason: \`${data[guild.id].joinRole}\` isn't a role on this server!`);
            if (!guild.member(client.user).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return guild.defaultChannel.sendMessage(":no_entry_sign: **Error:** I couldn't add the join role because I don't have the `Manage Roles` permission.");
            let role = guild.roles.find("name", data[guild.id].joinRole).id;
            if (data[guild.id].joinlog === "enabled") {
                if (member.user.bot) return guild.channels.find("name", "join-log").sendMessage(`Didn't add the join role to **${member.user.username}** because it is a bot.`);
                member.addRole(role);
                guild.channels.find("name", "join-log").sendMessage(`Added the join role of \`${data[guild.id].joinRole}\` to **${member.user.username}**.`);
            } else if (data[guild.id].joinlog !== "enabled") {
                if (member.user.bot) return guild.defaultChannel.sendMessage(`Didn't add the join role to **${member.user.username}** because it is a bot.`);
                member.addRole(role);
                guild.defaultChannel.sendMessage(`Added the join role of \`${data[guild.id].joinRole}\` to **${member.user.username}**.`);
            }
        }

    if (!data[guild.id]) data[guild.id] = {
        "joinlog": "disabled"
    };
        if (data[guild.id].joinlog && data[guild.id].joinlog === "enabled") {
            if (member.user.bot === true) {
                let today = new Date();
                let embed = new Discord.RichEmbed();
                let date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
                let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                embed.setColor(0x32CD32)
                    .setAuthor(member.user.username, member.user.avatarURL)
                    .setTitle("Bot Joined:")
                    .setDescription(`+ ${member.user.username}#${member.user.discriminator} (${member.user.id})`)
                    .setFooter(date + ` at ` + time)
                guild.channels.find("name", "join-log").sendEmbed(embed);
            } else {
                let today = new Date();
                let embed = new Discord.RichEmbed();
                let date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
                let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                embed.setColor(0x32CD32)
                    .setAuthor(member.user.username, member.user.avatarURL)
                    .setTitle("User Joined:")
                    .setDescription(`+ ${member.user.username}#${member.user.discriminator} (${member.user.id})`)
                    .setFooter(date + ` at ` + time)
                guild.channels.find("name", "join-log").sendEmbed(embed);
            }
        }
}
