const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const request = require('request-promise');
const vm = require('vm');

module.exports = class IMDBSearchCommandd extends Command {
	constructor(client) {
		super(client, {
			name: 'imdb',
			group: 'useful',
			memberName: 'imdb',
			description: 'Search for movies via the IMDB database.',
			examples: ['imdb star wars'],
			throttling: {
				usages: 2,
				duration: 60
			},
			args: [
				{
					key: 'query',
					prompt: 'What movie would you like to search for?\n',
					type: 'string'
				}
			]
		});
	}

	async run(msg, args) {
			const { query } = args;
			let link = `http://sg.media-imdb.com/suggests/${query.charAt(0).toLowerCase()}/${query.toLowerCase().replace(' ', '_')}.json`;
			const m = await msg.say('*Searching...*');
			const movie = await request.get(link).catch(() => null);
			const name = `imdb$${query.toLowerCase().replace(' ', '_')}`;
			const jsonpSandbox = vm.createContext({ [name]: function parse(obj) { return obj; } });
			const info = vm.runInContext(movie, jsonpSandbox);
			const embed = new RichEmbed();
			embed.setAuthor(`Requested by ${msg.author.username}:`, msg.author.displayAvatarURL)
		     	.setDescription(`:clapper: **[${info.d[0].l.replace('on IMDB', '')}](http://www.imdb.com/title/${info.d[0].id})**`)
				 	.setImage(info.d[1].i[0]);
			return m.edit({ embed });
	}
};
