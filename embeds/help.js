const { colors, VERSION } = require('../config.json');

const helpMsgEmbed = message => {
  return {
    color: colors.CONFIRM,
    title: `Turnip Bot (v${VERSION})`,
    description: 'Manage your turnip queue',
    fields: [
      { name: 'Usage', value: 'nips <command> <arguments>' },
      {
        name: 'Commands',
        value: `create\nlist\nteardown <listId>`,
        inline: true
      },
      {
        name: '\b',
        value: `create a new listing\nshow all listings\ntear down a current listing`,
        inline: true
      }
    ],
    footer: {
      text: '</> by bjm'
    }
  };
};

module.exports = { helpMsgEmbed };
