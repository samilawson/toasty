function clean(text) {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}
exports.run = (client, msg, args) => {
    args = args.join(" ");
    msg.channel.sendMessage(clean(args)).catch(e => {
        msg.channel.sendMessage(`:no_entry_sign: Please specify something for me to say!`);
    });
}
