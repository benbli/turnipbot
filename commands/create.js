const { createAdEmbed } = require('../embeds/adEmbed.js');
const ads = require('../api/controllers/ads.js');
const users = require('../api/controllers/users.js');
const { buildDiscordId } = require('../util/helpers.js');
const { NUMS } = require('../bot-settings.json');

module.exports = {
  name: 'create',
  description: 'create a new ad',
  usage: '<price>',
  args: true,
  argLength: 1,
  cooldown: 1,
  execute: async (bot, message, args) => {
    const price = parseInt(args[0]);
    const { MIN, MAX } = NUMS;

    if (isNaN(price) || !checkBetween(price, MIN, MAX)) {
      message.reply(
        `Please provide a number between ${MIN} and ${MAX} for the price`
      );
      return;
    }

    const userId = buildDiscordId(message);
    const userRecord = await users.findUserById(userId);
    const adRecord = await ads.createAdRecord(price, userRecord);
    console.log(adRecord);

    // const adEmbed = createAdEmbed(adRecord);
    // message.reply(`Would you like to post this ad?`, { embed: adEmbed });
  },
};

function checkBetween(x, min, max) {
  return x >= min && x <= max;
}
