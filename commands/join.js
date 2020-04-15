module.exports = {
  name: 'join',
  description: 'join a queue',
  usage: '<ad id>',
  args: true,
  cooldown: 5,
  execute: async (bot, message, args) => {
    message.channel.send('join!');
  }
};
