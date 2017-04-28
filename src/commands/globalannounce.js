exports.run = (client, msg, args, data, errors, devs) => {
    if (!devs.includes(msg.author.id)) return msg.reply(errors.devErr);
    let announcement = args.join(' ');
    if (msg.guild.id === '110373943822540800') return;
    client.guilds.forEach(guild => { guild.defaultChannel.sendMessage(announcement); });
}
