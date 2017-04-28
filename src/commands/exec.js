const childProcess = require('child_process');
exports.run = (client, msg, args, data, errors, devs) => {
    if (!devs.includes(msg.author.id)) return msg.reply(errors.devErr);
    childProcess.exec(args.join(' '), {},
        (err, stdout, stderr) => {
            if (err) return msg.channel.sendCode('', err.message);
            msg.channel.sendCode('', stdout);
        });
}
