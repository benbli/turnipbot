const { VERSION } = require('../config.json');

module.exports = {
  name: 'version',
  description: 'Version',
  execute(message, args) {
    message.channel.send(VERSION);
  }
};
