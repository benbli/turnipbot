const { colors } = require('../bot-settings.json');
exports.createAdEmbed = (records) => {
  console.log(records);

  return {
    color: colors.CONFIRM,
    title: `List of current Turnip Ads`,
    fields: [
      {
        name: 'Ad ID',
        value: listAdIds(records),
        inline: true,
      },
      {
        name: 'Price',
        value: listPrices(records),
        inline: true,
      },
      {
        name: 'Queued',
        value: listQueue(records),
        inline: true,
      },
    ],
  };
};

function listAdIds(records) {
  let ids = '';
  for (record of records) {
    let adId = record.get('ad_id');
    ids += `${adId}\n`;
  }

  return ids;
}

function listPrices(records) {
  let prices = '';
  for (record of records) {
    let adPrice = record.get('price');
    prices += `${adPrice}\n`;
  }

  return prices;
}

function listQueue(records) {
  let queues = '';
  let numQueued = '';
  for (record of records) {
    let total = record.get('total_visitors');
    let groupSize = record.get('group_size');
    let queueIds = record.get('queue_id');
    queueIds ? (numQueued = queueIds.length * groupSize) : (numQueued = 0);
    queues += `${numQueued}/${total}\n`;
  }

  return queues;
}
