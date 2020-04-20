module.exports = {
  name: "next",
  description: "start next group in queue",
  cooldown: 5,
  execute: async (bot, message, args) => {
    message.channel.send("next!");
  },
};
