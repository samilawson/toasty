const now = require('performance-now'),
      ping = require('async-pinger');
exports.run = (client, msg) => {
    let start = now();
    msg.channel.sendMessage("*Pinging...*")
        .then(m => {
            let end = now();
            ping('google.com', (err, ms) => {
                if (err) console.error(err);
                m.edit(`:ping_pong: **Pong!**\nMessage latency: **${m.createdTimestamp - msg.createdTimestamp}ms**\nEdit latency: **${(end - start).toFixed(0)}ms**\nDiscord Latency: **${Math.round(client.ping)}ms**\nGoogle latency: **${ms}ms**`);
          });
        });
}
