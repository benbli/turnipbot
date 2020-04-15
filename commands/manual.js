const { createHelpEmbed } = require('../embeds/helpEmbed.js');

module.exports = {
  name: 'help',
  description: 'turnip bot help manual',
  execute: async (bot, message, args) => {
    message.channel.send({ embed: createHelpEmbed(message) });
  }
};
