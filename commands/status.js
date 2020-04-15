// Show the current status of the listing
// Usage:
// !nips status <listId>
// host: show elapsed time, how many buyers are left, which group
// buyer: show elapsed time, any delays, current line in queue
// is next
module.exports = {
  name: 'status',
  description: 'show your current status',
  cooldown: 3,
  execute: async (bot, message, args) => {
    message.channel.send('Current status:');
  }
};
