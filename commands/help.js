const { helpMsgEmbed } = require('../embeds/help');

module.exports = {
  name: 'help',
  description: 'Bot Manual',
  execute(message, args) {
    message.author.send({ embed: helpMsgEmbed(message) });
  }
};
