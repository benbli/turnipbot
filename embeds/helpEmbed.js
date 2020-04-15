const { colors, VERSION } = require('../settings.json');
const commands = require('../commands/');

module.exports.createHelpEmbed = message => {
  return {
    color: colors.CONFIRM,
    title: `Turnip Bot (v${VERSION})`,
    description: 'Manage your turnip ad queue',
    fields: [
      { name: 'Usage', value: '!nips <command> <argument>' },
      {
        name: 'Commands',
        value: commandNames(commands),
        inline: true
      },
      {
        name: '\b',
        value: commandDescriptions(commands),
        inline: true
      }
    ],
    footer: {
      text: '</> by bjm'
    }
  };
};

function commandNames(commands) {
  let list = '';
  for (const cmd in commands) {
    list += `${commands[cmd].name} ${commands[cmd].usage || ''}\n`;
  }
  return list;
}

function commandDescriptions(commands) {
  let description = '';
  for (const cmd in commands) {
    description += `${commands[cmd].description}\n`;
  }
  return description;
}
