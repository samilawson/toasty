const Discord = require('discord.js');
exports.run = (client, msg) => {
    const embed = new Discord.RichEmbed();
    client.shard.fetchClientValues('guilds.size').then(results => {
        let total = results.reduce((prev, val) => prev + val, 0);
        embed.setColor(0x00FFE1)
            .setAuthor(client.user.username, client.user.avatarURL)
            .setTitle("Servers")
            .addField('Total shards:', client.shard.count)
            .addField('Total servers:', total)
            .addField('Shard 0 servers:', results[0])
            .addField('Shard 1 servers:', results[1])
        msg.channel.sendEmbed(embed);
    });
}
