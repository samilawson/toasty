exports.run = (client, msg) => {
    if (message.guild.id !== '208674478773895168') return;
    let role = msg.guild.roles.find("name", `Updates`);
    if (msg.member.roles.has(role.id)) {
        msg.member.removeRole(role).catch(e => { msg.reply(e) });
        msg.reply(":no_entry_sign: You will no longer recieve updates about Toasty on this server.")
    } else if (!message.member.roles.has(role.id)) {
        msg.member.addRole(role).catch(e => { msg.reply(e) });
        msg.reply(":white_check_mark: You will now recieve updates about Toasty on this server.");
    }
}
