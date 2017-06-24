const { Command } = require('discord.js-commando');
const faces = ["(∩ ͠°ل͜ °)⊃━☆","☞ ﾟ ͜ʖ ﾟ☞","ᖗ ◉ ᨓ ◉ ᖘ","ᕦ(ʘᴥʘ)ᕥ","(づ◉ ͜ʖ◉)づ","(づ>﹏<)づ","(☉ ͜ʖ☉)","(ง ò ʖ̯ ó )ง","ʕ ◕ ͜ʖ ◕ ʔ","ᕙ( ☉ Ꮂ ☉ )ᕗ","( ͡° ͜ʖ ͡° )","༼ つ ◕_◕ ༽つ","ಠ_ಠ","(ಥ﹏ಥ)","┬─┬ノ( º _ ºノ)","(▰˘◡˘▰)","╚(ಠ_ಠ)=┐","( ಠ ͜ʖರೃ)","┬┴┬┴┤ ͜ʖ ͡°) ├┬┴┬┴","¯\_(ツ)_/¯","( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)","(ง ﾟ ͜つ ﾟ)ง","( ͡°O ͜ʖ ͡°O)",];

module.exports = class FaceCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'face',
      group: 'fun',
      memberName: 'face',
      description: 'Sends a random internet face such as ༼ つ ◕_◕ ༽つ.',
      throttling: {
        usages: 2,
        duration: 3
      }
    });
  }

  async run(msg) {
    await msg.say(faces[Math.floor(Math.random()*faces.length)]);
  }
}
