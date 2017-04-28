const superagent = require('superagent');
exports.run = (client, msg, args) => {
    if (!args[0]) return;
    if (args[0] === "bug") return msg.reply("Please specify the bug. Example\n`;bug music isn't working. It says the range source is too large.`");
    args = args.join(" ");
    msg.reply("Your bug report has been sent to Toasty HQ for review. To check the status, join Toasty HQ by typing, `;hq`");
    const content = `**${msg.author.username}**#${msg.author.discriminator} (${msg.author.id}) reported a bug:\n${args}\nServer: **${msg.guild.name}**\nID: **${msg.guild.id}**`;
    const id = '303204275834585099';
    return new Promise((resolve, reject) => {
      superagent.post(`https://discordapp.com/api/channels/${id}/messages`)
      .set('Authorization', `Bot ${client.token}`).send({ content })
      .end((err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
}
