const fs = require('fs');
const path = require('path');
//const jsonPath = path.join(__dirname, '..', '..', 'web/stats.json');
const jsonPath = './web/stats.json';
const statsData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
exports.run = (client) => {
  console.log('ready');
  //console.log(`Shard ${client.shard.id}/${client.shard.count-1} ready! On ${client.guilds.size.toLocaleString()} guilds w/ ${client.users.size} users.`);
  client.user.setGame(`;help ;invite | ${client.guilds.size.toLocaleString()} servers!`)
  setTimeout(() => { client.user.setGame("discord.me/toasty") }, 30000);
  /*setInterval(() => {
    let total = new Array();
    client.shard.fetchClientValues('guilds.size').then(results => {
      total.push(results.reduce((prev, val) => prev + val, 0));
      client.shard.fetchClientValues('users.size').then(results => {
        total.push(results.reduce((prev, val) => prev + val, 0));
        client.shard.fetchClientValues('channels.size').then(results => {
          total.push(results.reduce((prev, val) => prev + val, 0));
            client.shard.fetchClientValues('voiceConnections.size').then(results => {
            total.push(results.reduce((prev, val) => prev + val, 0));
              if (!statsData["stats"]) statsData["stats"] = {
                "servers": "null",
                "users": "null",
                "channels": "null",
                "voiceConnections": "null"
              };
              statsData["stats"].servers = total[0];
              statsData["stats"].users = total[1];
              statsData["stats"].channels = total[2];
              statsData["stats"].voiceConnections = total[3];
              let updateValue = JSON.stringify(statsData, null, 2);
              fs.writeFileSync(jsonPath, updateValue);
          });
        });
      });
    });
  }, 180000);*/ //every 3 minutes
}
