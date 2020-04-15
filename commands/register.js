// TODO:
// Validate string for villager's name
// On register success, send back visual confirmation (user's profile)

const users = require('../api/controllers/users.js');

module.exports = {
  name: 'register',
  description: 'register your villager',
  usage: '<name>',
  args: true,
  argLength: 1,
  cooldown: 5,
  execute: async (bot, message, args) => {
    const { username, discriminator } = message.author;
    const targetId = `${username}#${discriminator}`;

    const userFound = await users.findUserById(targetId);

    if (userFound) {
      message.channel.send(`user already registered!`);
      return;
    }

    const userData = {
      user_id: targetId,
      villager_name: args[0], // validation needed
      avatar: message.author.displayAvatarURL()
    };

    try {
      const sucess = await users.registerUser(userData);

      if (sucess) {
        message.channel.send(`success!`);
        // send back user profile embed {userProfileEmbed}
        return;
      }
    } catch (err) {
      console.log(err.stack);
      throw err;
    }
  }
};
