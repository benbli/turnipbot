module.exports = {
  name: 'ping',
  description: 'ping!',
  cooldown: 5,
  execute: async (bot, message, args) => {
    message.channel.send('pong!');
  }
};
