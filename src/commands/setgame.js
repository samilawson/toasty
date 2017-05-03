exports.run = (client, msg, args, data, errors, devs) => {
    if (!devs.includes(msg.author.id)) return msg.reply(errors.devErr);
    args = args.join(" ");
    client.shard.broadcastEval(`this.user.setGame(\`${args}\`)`).catch(console.error);
    msg.reply(`I'm now playing **${args}**.`);
}
