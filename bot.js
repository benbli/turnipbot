require('dotenv').config();

const fs = require('fs');
const Discord = require('discord.js');
const { PREFIX } = require('./settings.json');

const bot = new Discord.Client({ disableEveryone: true });
bot.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

// Require all commands dynamically from commands folder
const commandFiles = fs
  .readdirSync('./commands')
  .filter(file => file.endsWith('.js'));

// Set each command onto the collection in the bot
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}

bot.login(process.env.DISCORD_TOKEN);

bot.once('ready', async () => {
  console.log(`${bot.user.username} online! `);
  // try {
  //   let link = await bot.generateInvite(['ADMINISTRATOR']);
  //   console.log(link);
  // } catch (e) {
  //   console.log(e.stack);
  // }
  // try {
  //   let url = 'https://jsonplaceholder.typicode.com/posts/1';
  //   fetch(url)
  //     .then(r => r.json())
  //     .then(console.log);
  // } catch (e) {
  //   throw e;
  // }
});

bot.on('message', async msg => {
  // Early exit for irrelevant/bot messages
  if (!msg.content.startsWith(PREFIX) || msg.author.bot) return;

  const withoutPrefix = msg.content.substr(PREFIX.length);
  const messageArray = withoutPrefix.split(/ +/);
  const commandName = messageArray[0].toLowerCase();
  const args = messageArray.slice(1);

  // Exit if user tries a nonexistent command
  if (!bot.commands.has(commandName)) {
    msg.reply(`Invalid command: \`${commandName}\``);
    return;
  }

  const command = bot.commands.get(commandName);

  if (command.args && args.length !== command.argLength) {
    let reply = `Please provide the proper argument(s) for the command: \`${commandName}\``;

    if (command.usage) {
      reply += `\nUsage: \`${PREFIX}${command.name} ${command.usage}\``;
    }

    return msg.channel.send(reply);
  }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(msg.author.id)) {
    const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return msg.reply(
        `Please wait ${timeLeft.toFixed(1)} more seconds before using \`${
          command.name
        }\` again.`
      );
    }
  }

  timestamps.set(msg.author.id, now);
  setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

  try {
    command.execute(bot, msg, args);
  } catch (e) {
    console.error(e);
    msg.reply(`Error executing command: "${command}"`);
  }
});

// Detect websocket or network connection errors
bot.on('shardError', error => {
  console.error('A websocket connection encountered an error:', error);
});

// Handle node side errors
process.on('unhandledRejection', error => {
  console.error('Unhandled promise rejection', error);
});
