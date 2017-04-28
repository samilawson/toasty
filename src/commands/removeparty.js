const fs = require('fs');
exports.run = (client, msg, args, data) => {
    let partyRole = msg.guild.roles.find("name", "party");
    if (!partyRole) return msg.channel.sendMessage("Before using this command the owner of this server must create a role called `party` and give it to anyone who should have permission to use the `;setparty` and `;removeparty` commands.");
    if (!msg.member.roles.has(partyRole.id)) return msg.channel.sendMessage(":no_entry_sign: **You don't have the ** `party` **role needed to set the party.**");
            if (!data[msg.guild.id]) data[msg.guild.id] = {party: "not set, use `;setparty` to set the party."};
            data[msg.guild.id].party = "not set, use `;setparty` to set the party.";
            let updateValue = JSON.stringify(data, null, 2);
            fs.writeFileSync('./v3/data/data.json', updateValue);
            msg.channel.sendMessage("The party is now removed.");
}
