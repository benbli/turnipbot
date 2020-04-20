const { VERSION } = require("../settings.json");

module.exports = {
  name: "version",
  description: "show the version number",
  execute: async (bot, message, args) => {
    message.channel.send(VERSION);
  },
};
