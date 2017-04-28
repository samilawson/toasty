const randomPokemon = require('pokemon-random-name'),
      pokemonGif = require('pokemon-gif');
exports.run = (client, msg) => {
    let pokemon = randomPokemon();
    let gif = pokemonGif(pokemon).catch(console.error);
    msg.channel.sendMessage(`**${msg.author.username}**, you have caught a wild **${pokemon}**!\n${gif}`);
}