exports.run = (client, msg, args, data, errors, devs) => {
    if (!devs.includes(msg.author.id)) return msg.reply(errors.devErr);
    let game = args.join(" ");
    client.user.setGame(game).catch(console.error);
    msg.reply(`I'm now playing **${game}**.`);
}
