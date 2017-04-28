"use strict";
const Discord = require('discord.js');
const Manager = new Discord.ShardingManager(`${__dirname}/toasty.js`, {totalShards: 2});
Manager.spawn().catch(console.error);
