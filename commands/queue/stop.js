module.exports = {
  name: "stop",
  description: "stop current queue",
  cooldown: 5,
  execute: async (bot, message, args) => {
    message.channel.send("stop!");
  },
};
