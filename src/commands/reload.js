exports.run = (client, msg, args, data, errors, devs) => {
  if (!devs.includes(msg.author.id)) return msg.reply(errors.devErr);
  if (!args || args.size < 1) return msg.reply(`Must provide a command name to reload.`);
  delete require.cache[require.resolve(`./${args[0]}.js`)];
  msg.reply(`:white_check_mark: The command **${args[0]}** has been reloaded!`);
};
