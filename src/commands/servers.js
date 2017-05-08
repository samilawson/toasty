const Discord = require('discord.js');
exports.run = (client, msg) => {
    const embed = new Discord.RichEmbed();
    client.shard.fetchClientValues('guilds.size').then(results => {
        let total = results.reduce((prev, val) => prev + val, 0);
       embed.setTitle("Server Information")
            .addField('Total servers:', total.toLocaleString())
            .addField('Total shards:', client.shard.count)
            .addField('Shard 0 servers:', results[0].toLocaleString())
            .addField('Shard 1 servers:', results[1].toLocaleString())
        msg.channel.sendEmbed(embed);
    });
}
