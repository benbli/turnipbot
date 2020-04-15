const questions = require('../collectors/prompts/createAd.json');

module.exports = {
  name: 'create',
  description: 'create a new ad',
  usage: '<price>',
  args: true,
  cooldown: 10,
  execute: async (bot, message, args) => {
    console.log(questions);
    message.reply(`create a listing`);
  }
};
