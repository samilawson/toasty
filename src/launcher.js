const Discord = require('discord.js');
const { shardCount } = require('./config.json');
const manager = new Discord.ShardingManager(`${__dirname}/toasty.js`, {totalShards: shardCount});
manager.spawn().catch(console.error);
manager.on('launch', shard => console.log(`Successfully launched shard ${shard.id}/${shardCount}.`));
