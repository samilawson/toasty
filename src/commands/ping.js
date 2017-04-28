const now = require('performance-now');
exports.run = (client, msg) => {
    let start = now();
    msg.channel.sendMessage("*Pinging...*")
        .then(m => {
            let end = now();
            m.edit(`:ping_pong: Pong!\nLatency by timestamp: **${m.createdTimestamp - msg.createdTimestamp}ms**\nLatency by now(): **${(end - start).toFixed(0)}ms**\nDiscord Latency: **${Math.round(client.ping)}ms**`);
        });
}
