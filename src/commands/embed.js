const Discord = require('discord.js');
exports.run = (client, msg, args) => {
    const embed = new Discord.RichEmbed();
    embed.setColor(3447003)
         .setAuthor(msg.author.username, msg.author.avatarURL)
         .setDescription(args.join(" "))
    msg.channel.sendEmbed(embed);
}
