const now = require('performance-now'),
    childProcess = require('child_process'),
    Discord = require('discord.js');
exports.run = (client, msg, args, data, errors, devs) => {
    const embed = new Discord.RichEmbed();
    let start = now();
    msg.channel.sendMessage("```+ Fetching...```")
        .then(msg => {
          let total = new Array();
          client.shard.fetchClientValues('guilds.size').then(results => {
              total.push(results.reduce((prev, val) => prev + val, 0));
          });
          client.shard.fetchClientValues('users.size').then(results => {
              total.push(results.reduce((prev, val) => prev + val, 0));
          });
          client.shard.fetchClientValues('channels.size').then(results => {
              total.push(results.reduce((prev, val) => prev + val, 0));
          });
          client.shard.fetchClientValues('voiceConnections.size').then(results => {
              total.push(results.reduce((prev, val) => prev + val, 0));
          });
            let end = now();
            let toExec = `top -bn2 | grep \"Cpu(s)\" | \\
        sed \"s/.*, *\\([0-9.]*\\)%* id.*/\\1/\" | \\
        awk '{print 100 - $1\"%\"}'`;
            let milliseconds = parseInt((client.uptime % 1000) / 100),
                seconds = parseInt((client.uptime / 1000) % 60),
                minutes = parseInt((client.uptime / (1000 * 60)) % 60),
                hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24);
            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
            let uptime = `${hours} hrs, ${minutes} mins, ${seconds}.${milliseconds} secs`;
            childProcess.exec(toExec, {},
                (err, stdout, stderr) => {
                    if (err) return msg.reply("There was a problem fetching my stats. Try again later.\n" + err);
                    childProcess.exec('cat /proc/meminfo', {},
                        (err2, stdout2, stderr2) => {
                          if (err2) return msg.reply("There was a problem fetching my stats. Try again later.\n" + err);
                          let totalMemory = parseInt(stdout2.substring(17, 25));
                          totalMemory = totalMemory / 1024;
                          totalMemory = totalMemory.toFixed(2);
                          let freeMemory = parseInt(stdout2.substring(45, 52));
                          freeMemory = freeMemory / 1024;
                          freeMemory = freeMemory.toFixed(2);
                          let activeMemory = parseInt(stdout2.substring(152, 165));
                          activeMemory = activeMemory / 1024;
                          activeMemory = activeMemory.toFixed(2);
                    embed.setColor(0x00FFE1)
                        .setAuthor(client.user.username, client.user.avatarURL)
                        .setTitle("Toasty Statistics:")
                        .setThumbnail(client.user.avatarURL)
                        .addField('Shard: ', `${client.shard.id} / ${client.shard.count}`)
                        .addField('Uptime: ', uptime, true)
                        .addField('Servers: ', `${client.guilds.size.toLocaleString()} / ${total[0].toLocaleString()}`, true)
                        .addField('Users: ', `${client.users.size.toLocaleString()} / ${total[1].toLocaleString()}`, true)
                        .addField('Channels: ', `${client.channels.size.toLocaleString()} / ${total[2].toLocaleString()}`, true)
                        .addField('Voice Connections: ', `${client.voiceConnections.size.toLocaleString()} / ${total[3].toLocaleString()}`, true)
                        .addField('Message Latency: ', `${Math.round(client.ping)} MS`, true)
                        .addField('Discord Latency: ', `${(end - start).toFixed(0)} MS`, true)
                        .addField('Memory Usage: ', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${totalMemory} MB`, true)
                        .addField('Free Memory: ', `${freeMemory} MB`, true)
                        .addField('Active Memory: ', `${activeMemory} MB`, true)
                        .addField('CPU Speed: ', '2.4 GHz', true)
                        .addField('CPU Usage: ', stdout.substring(5), true)
                        .addField(`OS: `, `Ubuntu 16.0.4`, true)
                    msg.channel.sendEmbed(embed);
                    return msg.edit('```Fetched!```');
                  });
                });
        }).catch(e => {
            msg.channel.sendMessage(":no_entry_sign: There was an error! Report this please:\n" + e);
        });
}
