exports.run = (client) => {
  console.log(`Popped out of the toaster! On ${client.guilds.size.toLocaleString()} guilds w/ ${client.users.size} users.`);
  client.user.setGame(`;help ;invite | ${client.guilds.size.toLocaleString()} servers!`)
  setTimeout(() => { client.user.setGame("discord.me/toasty"); }, 30000);
}
