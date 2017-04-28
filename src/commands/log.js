exports.run = (client, msg, args, embed, devs, devErr) => {
  if (!devs.includes(msg.author.id)) return msg.reply(devErr);
  let toLog = args.join(" ");
  console.log(toLog);
  msg.reply(`Just console logged\n\`\`\`\n${toLog}\n\`\`\``);
}
