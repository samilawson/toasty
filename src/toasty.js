const { CommandoClient } = require('discord.js-commando');
const fs = require('fs');
const path = require('path');
const config = require('./config');

const client = new CommandoClient({
  commandPrefix: config.prefix,
  unknownCommandResponse: false,
  owner: config.me,
  clientOptions: { disabledEvents: ['USER_NOTE_UPDATE', 'VOICE_STATE_UPDATE', 'TYPING_START', 'VOICE_SERVER_UPDATE', 'PRESENCE_UPDATE'] },
  disableEveryone: true,
  invite: 'https://discord.me/toasty'
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['util', 'Utility'],
    ['useful', 'Useful'],
    ['fun', 'Fun'],
    ['pokemon', 'Pokemon'],
    ['info', 'Information'],
    ['mod', 'Moderation'],
    ['config', 'Configuration'],
    ['music', 'Music'],
    ['misc', 'Miscellaneous'],
    ['commands', 'Commands']
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({ ping: false, prefix: false, help: false })
  .registerCommandsIn(path.join(__dirname, 'commands'));

fs.readdir(`${__dirname}/events/`, (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const eventFunction = require(`${__dirname}/events/${file}`);
    const eventName = file.split('.')[0];
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.login(config.token);
