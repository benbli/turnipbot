module.exports = {
  name: 'yeet',
  description: 'yeet a user',
  usage: '<user id>',
  args: true,
  cooldown: 5,
  execute: async (bot, message, args) => {
    message.channel.send('yeet!');
  },
};
