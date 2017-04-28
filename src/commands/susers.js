exports.run = (client, msg) => {
    msg.channel.sendMessage(`There are **${msg.guild.memberCount.toLocaleString()}** members on this server.`);
}