const leet = require('l33tsp34k');
exports.run = (client, msg, args) => {
    msg.channel.sendMessage(leet(args.join(" "))).catch(e => {
        msg.channel.sendMessage(`:no_entry_sign: Please specify something for me to say!`);
    });
}
