module.exports = {
  name: 'create',
  description: 'Create a new listing',
  args: true,
  usage: `<dodoCode>`,
  cooldown: 10,
  execute(message, args) {
    message.reply(`create a listing`);
  }
};
