const { Command } = require('discord.js-commando');

module.exports = class AvatarCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'avatar',
      group: 'info',
      aliases: ['profile'],
      memberName: 'avatar',
      description: 'Sends the avatar of you or the mentioned user.',
      examples: ['avatar', 'avatar @user'],
      args: [
				{
					key: 'user',
					prompt: 'What user\'s avatar would you like to get?\n',
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
    const avatar = msg.mentions.users.size ? msg.mentions.users.first().avatarURL : msg.author.avatarURL;
    if (msg.mentions.users.size > 0)
      msg.say(`Avatar for, **${msg.mentions.users.first().username}**:\n${avatar}`);
    else msg.say(`Avatar for, **${msg.author.username}**:\n${avatar}`);
  }
}
