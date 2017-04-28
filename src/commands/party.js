exports.run = (client, msg, args, data) => {
    let party = data[msg.guild.id] || {party: "not set, use `;setparty` to set the party."};
    msg.channel.sendMessage("The current party is " + party.party);
}
