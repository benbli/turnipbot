const { colors } = require('../bot-settings.json');
exports.createAdEmbed = (record) => {
  const {
    user_id,
    price,
    total_visitors,
    group_size,
    tip,
    rule,
    reentry,
  } = record;
  return {
    color: colors.CONFIRM,
    title: `Turnip Ad`,
    fields: [
      {
        name: 'Hosted by',
        value: user_id,
      },
      {
        name: 'Turnip price',
        value: price,
      },
      {
        name: 'Visitors to host',
        value: total_visitors,
      },
      {
        name: 'Group size',
        value: group_size,
      },
      {
        name: 'Tip message',
        value: tip,
      },
      {
        name: 'Rules/FAQ',
        value: rule,
      },
      {
        name: 'Reentry allowed',
        value: reentry,
      },
    ],

    footer: {
      text: '</> by bjm',
    },
  };
};
