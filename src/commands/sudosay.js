function clean(text) {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}
exports.run = (client, msg, args) => {
    msg.delete();
    msg.channel.sendMessage(clean(args.join(' ')));
}
