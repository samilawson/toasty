const { Command } = require('discord.js-commando');
const fs = require('fs');
const path = require('path');

module.exports = class InventoryCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'inventory',
      group: 'pokemon',
      memberName: 'inventory',
      description: 'Shows your or others pokemon inventory.',
      details: 'Catch pokemon with the pokemon command.\nYou can view your or others pokemon with this command.',
      examples: ['inventory', 'inventory @user'],
      guildOnly: true,
      args: [
        {
          key: 'page',
          prompt: 'What page of the inventory would you like to view?\n',
          type: 'integer',
          default: 1
        },
        {
          key: 'user',
          prompt: 'Who\'s pokemon inventory would you like to view?\n',
          type: 'user',
          default: ''
        }
      ],
      throttling: {
        usages: 1,
        duration: 10
      }
    });
  }

  async run(msg, args) {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'data/pokemon.json'), 'utf8'));
    const user = args.user || msg.author;

    if (!data[user.id]) return msg.say('That user has no pokemon!');

    const toSend = new Array();
    Object.keys(data[user.id].pokemon).forEach(key => {
      toSend.push(data[user.id].pokemon[key].name);
    });

    function showPage(i) {
      let start = i * 10;
      start += 1;
      let stop = start + 20;
      msg.say(`__**${user.username}'s Pokemon:**__ *[Page ${i} (20 shown)]*\n**${toSend.slice(start, stop).join('\n')}**`);
    }

    const { page } = args;
    if (toSend.length > 20) setTimeout(() => { msg.say(`To show the next page of the inventory, type, ${this.client.commandPrefix}inventory [page number]`) }, 1000);
    if (page === 1) msg.say(`__**${user.username}'s Pokemon:**__ Includes **${toSend.length}** Pokemon. *[Page 1 (20 shown)]* \n**${toSend.slice(0, 20).join('\n')}**`);
    else showPage(page);
  }
};
