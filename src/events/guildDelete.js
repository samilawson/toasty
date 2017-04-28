const superagent = require('superagent');
function clean(text) {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}
exports.run = (client, guild) => {
    const content = clean(`:x: I'v been removed from server, **${guild.name}**.`);
    const id = '303203639101620224';
    return new Promise((resolve, reject) => {
      superagent.post(`https://discordapp.com/api/channels/${id}/messages`)
      .set('Authorization', `Bot ${client.token}`).send({ content })
      .end((err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
}
