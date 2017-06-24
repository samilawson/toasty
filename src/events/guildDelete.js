const snekfetch = require('snekfetch');
const fs = require('fs');
const path = require('path');
const jsonPath = path.join(__dirname, '..', 'data/servers.json');

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
}

exports.run = (client, guild) => {
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  delete data[guild.id];
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));

  /*const content = clean(`:x: I've been removed from server, **${guild.name}**.`);
  const id = '303203639101620224';
  snekfetch.post(`https://discordapp.com/api/channels/${id}/messages`)
    .set('Authorization', `Bot ${client.token}`)
    .send({ content })
    .then(console.log('Added to server and sent to log.'));*/
}
