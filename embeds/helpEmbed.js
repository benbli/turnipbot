const { colors, VERSION } = require('../bot-settings.json');
const commands = require('../commands/');
const hostCommands = require('../commands/queue');

module.exports.createHelpEmbed = (message) => {
  return {
    color: colors.CONFIRM,
    title: `Turnip Bot (v${VERSION})`,
    description: 'Manage your turnip ad queue',
    fields: [
      { name: 'Usage', value: '!nips <command> <argument>' },
      {
        name: 'Commands',
        value: listNames(commands),
        inline: true,
      },
      {
        name: '\b',
        value: listDescriptions(commands),
        inline: true,
      },
      { name: '\b', value: '\b', inline: true },
      {
        name: 'Queue Commands',
        value: listNames(hostCommands),
        inline: true,
      },
      {
        name: '\b',
        value: listDescriptions(hostCommands),
        inline: true,
      },
      { name: '\b', value: '\b', inline: true },
    ],
    footer: {
      text: '</> by bjm',
    },
  };
};

function listNames(commands) {
  let list = '';
  for (const cmd in commands) {
    list += `${commands[cmd].name} ${commands[cmd].usage || ''}\n`;
  }
  return list;
}

function listDescriptions(commands) {
  let description = '';
  for (const cmd in commands) {
    description += `${commands[cmd].description}\n`;
  }
  return description;
}
