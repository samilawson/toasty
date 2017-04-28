const fs = require('fs');
exports.run = (client, msg, args, data) => {
    args = args.join(" ");
    let partyRole = msg.guild.roles.find("name", "party");
    if (!partyRole) return msg.channel.sendMessage("Before using this command the owner of this server must create a role called `party` and give it to anyone who should have permission to use the `;setparty` and `;removeparty` commands.");
    let role = msg.guild.roles.find("name", "party");
    if (!msg.member.roles.has(partyRole.id)) return msg.channel.sendMessage(":no_entry_sign: **You don't have the ** `party` **role needed to set the party.**");
            if (!data[msg.guild.id]) data[msg.guild.id] = {party: "not set, use `;setparty` to set the party."};
            data[msg.guild.id].party = args;
            let updateValue = JSON.stringify(data, null, 2);
            fs.writeFileSync('./v2/data/data.json', updateValue);
            let say = data[msg.guild.id] || {party: "not set, use `;setparty` to set the party."};
            msg.channel.sendMessage("**" + msg.author.username + "** set the party to `" + say.party + "`");
            msg.channel.sendMessage("The party is now: " + say.party);
}
