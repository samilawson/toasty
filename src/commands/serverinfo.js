const Discord = require('discord.js');
function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
};
exports.run = (client, msg, args) => {
  const embed = new Discord.RichEmbed();
  let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻"];
      let region = {
          "brazil": "Brazil",
          "eu-central": "Central Europe",
          "singapore": "Singapore",
          "us-central": "U.S. Central",
          "sydney": "Sydney",
          "us-east": "U.S. East",
          "us-south": "U.S. South",
          "us-west": "U.S. West",
          "eu-west": "Western Europe",
          "vip-us-east": "VIP U.S. East",
          "london": "London",
          "amsterdam": "Amsterdam",
          "hongkong": "Hong Kong"
      };

      var emojis;
      if (msg.guild.emojis.size === 0) {
          emojis = 'None';
      } else {
          emojis = msg.channel.guild.emojis.map(e => e).join(" ");
      }
  embed.setAuthor(msg.guild.name, msg.guild.iconURL ? msg.guild.iconURL : client.user.displayAvatarURL)
  .setThumbnail(msg.guild.iconURL ? msg.guild.iconURL : me.user.displayAvatarURL)
  .addField("Created", `${msg.guild.createdAt.toString().substr(0, 15)},\n${checkDays(msg.guild.createdAt)}`, true)
  .addField("ID", msg.guild.id, true)
  .addField("Owner", `${msg.guild.owner.user.username}#${msg.guild.owner.user.discriminator}`, true)
  .addField("Region", region[msg.guild.region], true)
  .addField("Members", msg.guild.memberCount, true)
  .addField("Roles", msg.guild.roles.size, true)
  .addField("Channels", msg.guild.channels.size, true)
  .addField("Emojis", emojis, true)
  .addField("Verification Level", verifLevels[msg.guild.verificationLevel], true)
  .addField("Default Channel", msg.guild.defaultChannel, true)
  .setColor(3447003)
  msg.channel.sendEmbed(embed);
}
