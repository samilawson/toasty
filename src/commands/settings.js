const Discord = require('discord.js');
exports.run = (client, msg, args, data, errors, devs) => {
    const embed = new Discord.RichEmbed();
    let settingsData = data[msg.guild.id] ? data[msg.guild.id] : {settings: "none"};
    if (!settingsData.party) {
        var party = "not set, use `;setparty` to set the party.";
    } else {
        var party = settingsData.party;
    }
    if (!settingsData.noinvite) {
        var noinvite = "disabled";
    } else {
        var noinvite = settingsData.noinvite;
    }
    if (!settingsData.joinMessage) {
        var joinMessage = "disabled";
    } else {
        var joinMessage = settingsData.joinMessage;
    }
    if (!settingsData.leaveMessage) {
        var leaveMessage = "disabled";
    } else {
        var leaveMessage = settingsData.leaveMessage;
    }
    if (!settingsData.joinDM) {
        var joinDM = "disabled";
    } else {
        var joinDM = settingsData.joinDM;
    }
    if (!settingsData.joinRole) {
        var joinRole = "disabled";
    } else {
        var joinRole = settingsData.joinRole;
    }
    if (!settingsData.joinlog) {
        var joinlog = "disabled";
    } else {
        var joinlog = settingsData.joinlog;
    }
    if (!settingsData.nonsfw) {
        var nonsfw = "disabled";
    } else {
        var nonsfw = settingsData.nonsfw;
    }
    if (!settingsData.modlog) {
        var modlog = "disabled";
    } else {
        var modlog = settingsData.modlog;
    }

    embed.setColor(0x00FFE1)
        .setAuthor(`Server settings for, ${msg.guild.name}`, msg.guild.iconURL)
        .setDescription("")
        .setThumbnail("http://icons.iconarchive.com/icons/dtafalonso/android-l/512/Settings-L-icon.png")
        .addField(`Join Message`, joinMessage, true)
        .addField(`Leave Message`, leaveMessage, true)
        .addField(`Join DM`, joinDM, true)
        .addField(`Join Role`, joinRole, true)
        .addField(`Join Log`, joinlog, true)
        .addField(`Mod Log`, modlog, true)
        .addField(`No Invite`, noinvite, true)
        .addField(`No NSFW`, nonsfw, true)
        .addField(`Party`, party, true)
    msg.channel.sendEmbed(embed).catch(e => {
        msg.channel.sendMessage(":no_entry_sign: There was an error!\n" + e);
    });
}
