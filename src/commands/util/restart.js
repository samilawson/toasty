const { Command } = require('discord.js-commando');
const { ShardClientUtil } = require('discord.js');

module.exports = class RestartCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'restart',
      group: 'util',
      aliases: ['reboot', 'kill'],
      memberName: 'restart',
      description: 'Restarts the bot.',
      details: 'Only the bot owner can use this command.',
      args: [
        {
          key: 'restartType',
          prompt: 'Would you like to restart just this shard. or all shards?\n',
          type: 'string'
        }
      ]
    });
  }

  hasPermission(msg) {
		return this.client.options.owner === msg.author.id;
	}

  async run(msg, args) {
    const restartType = args.restartType.toLowerCase();
    if (restartType === 'this') {
      msg.say(`\`\`\`css\nRestarting shard ${this.client.shard.id}...\`\`\``);
      console.log(`Restarting shard ${this.client.shard.id}...`);
      setTimeout(() => { console.log(process.exit(0)); }, 400);
    } else
    if (restartType === 'all') {
      const shardClientUtil = new ShardClientUtil(this.client);
      msg.say('```css\nRestarting all shards...```');
      console.log('Restarting all shards...');
      setTimeout(() => {
        shardClientUtil.broadcastEval(console.log(process.exit(0))).then(x => {
          console.log(x);
        });
      }, 400);
    } else {
      msg.say(':no_entry_sign: That\'s not a valid restart type. Returning...');
    }
  }
};
