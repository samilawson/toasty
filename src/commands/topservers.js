exports.run = (client, msg) => {
    client.shard.fetchClientValues('guilds.size').then(results => {
        let guilds = results.reduce((prev, val) => prev + val, 0);
        let sorted = guilds.array().sort((a,b) => {return b.memberCount - a.memberCount});
        let top10 = sorted.splice(0,10);
        let mappedNames = top10.map(s => s.name);
        let mappedCount = top10.map(s => s.memberCount);
        msg.channel.sendMessage(`1. **${mappedNames[0]}**: ${mappedCount[0].toLocaleString()}\n2. **${mappedNames[1]}**: ${mappedCount[1].toLocaleString()}\n3. **${mappedNames[2]}**: ${mappedCount[2].toLocaleString()}\n4. **${mappedNames[3]}**: ${mappedCount[3].toLocaleString()}\n5. **${mappedNames[4]}**: ${mappedCount[4].toLocaleString()}\n6. **${mappedNames[5]}**: ${mappedCount[5].toLocaleString()}\n7. **${mappedNames[6]}**: ${mappedCount[6].toLocaleString()}\n8. **${mappedNames[7]}**: ${mappedCount[7].toLocaleString()}\n9. **${mappedNames[8]}**: ${mappedCount[8].toLocaleString()}\n10. **${mappedNames[9]}**: ${mappedCount[9].toLocaleString()}`);
    });
}
