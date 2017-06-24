const { Command } = require('discord.js-commando');

module.exports = class IDCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'id',
      group: 'info',
      aliases: ['userid'],
      memberName: 'id',
      description: 'Sends the ID of you or the mentioned user.',
      examples: ['id', 'id @user'],
      args: [
				{
					key: 'user',
					prompt: 'What user\'s ID would you like to get?\n',
					type: 'member',
          default: ''
				}
      ],
      throttling: {
        usages: 2,
        duration: 3
      }
    });
  }

  run(msg, args) {
    const id = msg.mentions.users.size ? msg.mentions.users.first().id : msg.author.id;
      if (msg.mentions.users.size > 0)
        msg.channel.sendMessage(`:id: for **${msg.mentions.users.first().username} :** \`${id}\``);
      else msg.channel.sendMessage(`:id: for **${msg.author.username} :** \`${id}\``);
  }
}
