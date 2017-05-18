const Discord = require('discord.js'),
      client = new Discord.Client(),
      url = require('url'),
      indico = require('indico.io'),
      fs = require('fs'),
      yt = require('ytdl-core'),
      YouTube = require('youtube-node'),
      youTube = new YouTube(),
      data = JSON.parse(fs.readFileSync(`${__dirname}/data/data.json`, 'utf8')),
      config = require('./config.json'),
      prefix = config.prefix,
      devs = config.devs,
      errors = {"devErr": config.devErr, "ubcErr": config.bcErr, "sbcErr": config.sbcErr};
youTube.setKey(config.youTubeToken);

fs.readdir(`${__dirname}/events/`, (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`${__dirname}/events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});

let queue = new Object();

const musicCommands = {
    'play': (msg) => {
        if (queue[msg.guild.id] === undefined) return msg.channel.sendMessage(`Add some songs to the queue first with ;add`);
        if (!msg.guild.voiceConnection) return musicCommands.join(msg).then(() => musicCommands.play(msg));
        if (queue[msg.guild.id].playing) return msg.channel.sendMessage('Already Playing');
        let dispatcher;
        queue[msg.guild.id].playing = true;

        (function play(song) {
            if (song === undefined) return msg.channel.sendMessage('Queue is empty').then(() => {
                queue[msg.guild.id].playing = false;
                msg.member.voiceChannel.leave();
            });
            msg.channel.sendMessage(`:notes: Playing **${song.title}** as requested by **${song.requester}**`);
            dispatcher = msg.guild.voiceConnection.playStream(yt(song.url, {
                audioonly: true
            }), {
                passes: 1
            });
            let collector = msg.channel.createCollector(m => m);
            collector.on('message', m => {
                if (m.content.startsWith(';pause')) {
                    msg.channel.sendMessage(':pause_button: Paused').then(() => {
                        dispatcher.pause();
                    });
                } else if (m.content.startsWith(';resume')) {
                    msg.channel.sendMessage(':play_pause: Resumed').then(() => {
                        dispatcher.resume();
                    });
                } else if (m.content.startsWith(';skip')) {
                    msg.channel.sendMessage(':arrow_forward: Skipped').then(() => {
                        dispatcher.end();
                    });
                } else if (m.content.startsWith(';volume+')) {
                    if (Math.round(dispatcher.volume * 50) >= 100) return msg.channel.sendMessage(`:speaker: Volume: ${Math.round(dispatcher.volume*50)}%`);
                    dispatcher.setVolume(Math.min((dispatcher.volume * 50 + (2 * (m.content.split('+').length - 1))) / 50, 2));
                    msg.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
                } else if (m.content.startsWith(';volume-')) {
                    if (Math.round(dispatcher.volume * 50) <= 0) return msg.channel.sendMessage(`:speaker: Volume: ${Math.round(dispatcher.volume*50)}%`);
                    dispatcher.setVolume(Math.max((dispatcher.volume * 50 - (2 * (m.content.split('-').length - 1))) / 50, 0));
                    msg.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
                } else if (m.content.startsWith(';time')) {
                    msg.channel.sendMessage(`:clock1: Time: ${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((dispatcher.time % 60000)/1000) : Math.floor((dispatcher.time % 60000)/1000)}`);
                }
            });
            dispatcher.on('end', () => {
                collector.stop();
                play(queue[msg.guild.id].songs.shift());
            });
            dispatcher.on('error', (err) => {
                return msg.channel.sendMessage(':no_entry_sign: Error: ' + err).then(() => {
                    collector.stop();
                    play(queue[msg.guild.id].songs.shift());
                });
            });
        })(queue[msg.guild.id].songs[0]);
    },
    'join': (msg) => {
        return new Promise((resolve, reject) => {
            const voiceChannel = msg.member.voiceChannel;
            if (!voiceChannel || voiceChannel.type !== 'voice') return msg.reply(':no_entry_sign: I couldn\'t connect to your voice channel...');
            voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
        });
    },
    'add': (msg) => {
        function addFromUrl(url) {
            msg.channel.sendMessage("*Adding...*");
            if (url == '' || url === undefined) return msg.channel.sendMessage(`You must add a YouTube video url after ;add`);
            yt.getInfo(url, (err, info) => {
                if (err) return msg.channel.sendMessage(':no_entry_sign: Invalid YouTube Link: ' + err);
                if (!queue.hasOwnProperty(msg.guild.id)) queue[msg.guild.id] = {}, queue[msg.guild.id].playing = false, queue[msg.guild.id].songs = [];
                queue[msg.guild.id].songs.push({
                    url: url,
                    title: info.title,
                    requester: msg.author.username
                });
                msg.channel.sendMessage(`:white_check_mark: Added **${info.title}** to the queue`);
            });
        }

        function addFromQuery(query) {
            youTube.search(query, 2, function(error, result) {
                if (error) {
                    msg.channel.sendMessage(`:no_entry_sign: **Error:**\n${error}`);
                    console.log(error);
                } else {
                    if (!result.items[0]["id"]) return msg.reply(":no_entry_sign: **Error:** There was an issue getting that song, please try a YouTube video URL instead.");
                    let url = `https://www.youtube.com/watch?v=${result.items[0]["id"].videoId}`;
                    addFromUrl(url);
                }
            });
        }

        if (msg.content === ";add") return;
        let url = msg.content.split(' ')[1];
        if (url.includes("https://youtube.com/") || url.includes("https://www.youtube.com/") || url.includes("http://youtube.com/") || url.includes("http://www.youtube.com/") || url.includes("https://youtu.be/") || url.includes("https://www.youtu.be/") || url.includes("http://youtu.be/") || url.includes("http://www.youtu.be/")) {
            addFromUrl(url);
        } else {
            let query = msg.content.replace(';add', '');
            addFromQuery(query);
        }
    },
    'queue': (msg) => {
        if (queue[msg.guild.id] === undefined) return msg.channel.sendMessage(`Add some songs to the queue first with ;add`);
        let tosend = [];
        queue[msg.guild.id].songs.forEach((song, i) => {
            tosend.push(`${i+1}. ${song.title} - Requested by: ${song.requester}`);
        });
        msg.channel.sendMessage(`__**${msg.guild.name}'s Music Queue:**__ Currently **${tosend.length}** songs queued ${(tosend.length > 15 ? '*[Only next 15 shown]*' : '')}\n\`\`\`${tosend.slice(0,15).join('\n')}\`\`\``);
    },
    'youtube': (msg) => {
        let query = msg.content.replace(';youtube', '');
        youTube.search(query, 2, function(error, result) {
            if (error) {
                msg.channel.sendMessage(`:no_entry_sign: **Error:**\n${error}`);
            } else {
                let embed = new Discord.RichEmbed();
                embed.setColor(3447003)
                    .setAuthor(query, 'https://cdn2.iconfinder.com/data/icons/ios-7-style-metro-ui-icons/512/Flurry_YouTube_Alt.png')
                    .setThumbnail(result.items[0]["snippet"].thumbnails.default.url)
                    .addField(result.items[0]["snippet"].description, `**[${result.items[0]["snippet"].title}](https://www.youtube.com/watch?v=${result.items[0]["id"].videoId})**`)
                msg.channel.sendEmbed(embed);
            }
        });
    }
};

client.on('message', msg => {

    if (msg.channel.type === "dm") return;
    if (!msg.guild.member(client.user).hasPermission("SEND_MESSAGES")) return;

    let dataNSFW = data[msg.guild.id] ? data[msg.guild.id] : {nonsfw: "disabled"};
    if (dataNSFW.nonsfw === "enabled") {
        const urls = msg.attachments
            .map(a => a.url)
            .concat(msg.content.split(' ')
                .map(x => url.parse(x))
                .filter(x => x.hostname)
                .map(x => url.format(x)));
        for (const URL of urls) {
            indico.contentFiltering(URL, {
                    apiKey: config.indicoToken
                })
                .then((res) => {
                    if (typeof res !== 'number' || res < (0.93 || 0.40)) return;
                    if (!msg.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return msg.reply("`Error:` Could not delete nsfw content because I do not have the `Manage Messages` permission!").catch(err => {
                        msg.channel.sendMessage(`An error occured. Please report this:\n${err}`);
                    });
                    msg.delete();
                    msg.reply(':no_entry_sign: There is no NSFW content allowed on this server!');
                }).catch(() => {});
        }
    }

    if (msg.content.includes("https://discord.gg/") || msg.content.includes("http://discord.gg/") || msg.content.includes("discord.gg/") || msg.content.includes("https://discordapp.com/invite/") || msg.content.includes("http://discordapp.com/invite/")) {
        let dataNoinv = data[msg.guild.id] ? data[msg.guild.id] : {
            noinvite: "disabled"
        };
        if (dataNoinv.noinvite === "enabled") {
            if (!msg.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return msg.reply("`Error:` Could not delete invite because I do not have the `Manage Messages` permission!");
            msg.delete().then(() => msg.reply(":no_entry_sign: There is no invite link sending allowed on this server!"));
        } else {
            return;
        }
    }

    if (msg.author.bot) return;

    //mention help
    if (msg.content.startsWith("<@208946659361554432> help")) {
        msg.reply("Hello! My help command is, `;help`.\nFor support please type, `;hq`.");
    }

    if (msg.content.startsWith("<@208946659361554432> ") || msg.content.startsWith(prefix + "chat")) {
        if (msg.content.startsWith("<@208946659361554432> help")) return;
        msg.channel.sendMessage("This feature is currently down! We've run out of API calls to cleverbot.org and need donations to get more.\nType `;donate` to donate to fund more API requests for this command.");
    }

    if (!msg.content.startsWith(prefix)) return;

    if (musicCommands.hasOwnProperty(msg.content.toLowerCase().slice(1).split(' ')[0])) musicCommands[msg.content.toLowerCase().slice(1).split(' ')[0]](msg);

    let command = msg.content.split(' ')[0];
    command = command.slice(prefix.length);

    let args = msg.content.split(' ').slice(1);

    try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, msg, args, data, errors, devs);
    } catch (err) {
        if (err.code === "MODULE_NOT_FOUND") return;
        console.error(err);
    }
});

client.login(config.token);
