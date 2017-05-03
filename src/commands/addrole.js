exports.run = (client, msg, args) => {
    if (!msg.guild.member(client.user).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return msg.reply(":no_entry_sign: **Error:** I don't have the **Manage Roles** permission!");
    if (!msg.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return msg.reply(":no_entry_sign: **Error:** You don't have the **Manage Roles** permission!");
    if (msg.mentions.users.size === 0) return msg.reply(":no_entry_sign: Please mention a user to give the role to.\nExample: `;addrole @user Members`");
    let member = msg.guild.member(msg.mentions.users.first());
    if (!member) return msg.reply(":no_entry_sign: **Error:** That user does not seem valid.");
    let name = args.join(" ");
    let role = msg.guild.roles.find("name", name);
    if (!role) return msg.reply(`:no_entry_sign: **Error:** ${name} isn't a role on this server!`);
    let botRolePosition = msg.guild.member(client.user).highestRole.position;
    let rolePosition = role.position;
    if (botRolePosition <= rolePosition) return msg.channel.sendMessage(":no_entry_sign: **Error:** Failed to add the role to the user because my highest role is lower than the specified role.");
    member.addRole(role).catch(e => {
        return msg.channel.sendMessage(`:no_entry_sign: **Error:**\n${e}`);
    });
    msg.channel.sendMessage(`:white_check_mark: **${msg.author.username}**, I've added the role of **${name}** to **${msg.mentions.users.first().username}**.`);
}
