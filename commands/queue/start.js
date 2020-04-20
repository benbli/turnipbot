module.exports = {
  name: "start",
  description: "start a queue",
  cooldown: 5,
  execute: async (bot, message, args) => {
    message.channel.send("start!");
  },
};
