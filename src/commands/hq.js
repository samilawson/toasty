exports.run = (client, msg) => {
    msg.channel.sendMessage(`:mailbox_with_mail: **${msg.author.username}**, check your DM's!`);
    msg.author.sendMessage("**Join Toasty HQ with these invites!**\nhttps://discord.gg/sKCDdfp\nhttps://discord.me/toasty");
}
