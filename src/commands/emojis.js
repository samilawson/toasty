exports.run = (client, msg) => {
    var emojis;
    if (msg.guild.emojis.size === 0) {
        emojis = 'There are no emojis on this server.'
    } else {
        emojis = `Here are all the emojis on this server:\n${msg.guild.emojis.map(e => e).join(" ")}`;
    }
    msg.channel.sendMessage(emojis);
}