exports.run = (client, msg, args) => {
    args = args.join(" ");
    if (!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.reply(":no_entry_sign: **Error:** You don't have the **Manage Messages** permission!");
    if (!msg.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return msg.channel.sendMessage(":no_entry_sign: **Error:** I don't have the **Manage Messages** permission!");
    if (args == '') return;
    let count = parseInt(args) + 1;
    msg.channel.fetchMessages({
            limit: count
        })
        .then(msgs => msg.channel.bulkDelete(msgs));
    msg.channel.sendMessage(`I have pruned **${messagecount}** messages.`).then(m => {
        setTimeout(() => {
            m.delete();
        }, 2500);
    });
}
