exports.run = (client, msg, args) => {
    msg.channel.sendMessage("*Searching...*").then(m => { setTimeout(() => {m.edit(`:clapper: **${msg.author.username}**, http://giphy.com/search/${args.join("-")}`); }, 1000)});
}
