const ads = require('../api/controllers/ads');
const { createAdEmbed } = require('../embeds/adListEmbed');
// Show the current status of the listing
// Usage:
// !nips status <listId>
// host: show elapsed time, how many buyers are left, which group
// buyer: show elapsed time, any delays, current line in queue
// is next
module.exports = {
  name: 'list',
  description: 'show a list of current ads',
  cooldown: 3,
  execute: async (bot, message, args) => {
    const activeAds = await ads.listAllActiveAds();
    message.channel.send({ embed: createAdEmbed(activeAds) });
  },
};
