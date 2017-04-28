exports.run = (client, msg) => {
    msg.channel.fetchMessages({limit: 75})
      .then(msgs => {
        let msg_array = msgs.array().filter(m => m.author.id === client.user.id);
        msg.channel.bulkDelete(msg_array);
      });
    msg.channel.sendMessage(":white_check_mark: Cleaned up commands!");
}
