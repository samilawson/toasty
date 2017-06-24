const { Command } = require('discord.js-commando');
const options = ['heads', 'tails'];

module.exports = class CoinFlipCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'coinflip',
      aliases: ['fac', 'flipacoin', 'flipcoin'],
      group: 'fun',
      memberName: 'coinflip',
      description: 'Flips a coin.',
      throttling: {
        usages: 2,
        duration: 3
      }
    });
  }

  run(msg) {
    msg.say(`**${msg.author.username}**, you got **${options[Math.floor(Math.random() * options.length)]}**!`);
  }
}
