require('dotenv').config();

const fs = require('fs');
const Discord = require('discord.js');
const { PREFIX } = require('./config.json');
const client = new Discord.Client();

// Require all commands dynamically from commands folder
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync('./commands')
  .filter(file => file.endsWith('.js'));

// Set each command onto the collection in the client
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
  console.log('Bot online!');
});

client.on('message', msg => {
  // Early exit for nonrelevant/bot messages
  if (!msg.content.startsWith(PREFIX) || msg.author.bot) return;

  const withoutPrefix = msg.content.substr(PREFIX.length);
  const splitMsg = withoutPrefix.split(/ +/);
  const commandName = splitMsg[0].toLowerCase();
  const args = splitMsg.slice(1);

  // Exit if user tries a nonexistent command
  if (!client.commands.has(commandName)) {
    return msg.reply(`Invalid command: "${command}"`);
  }

  const command = client.commands.get(commandName);

  if (command.args && !args.length) {
    let reply = `Please provide the proper argument(s) for the command: \`${commandName}\``;

    if (command.usage) {
      reply += `\nThe proper usage is: \`${PREFIX}${command.name} ${command.usage}\``;
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
    command.execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply(`Error executing command: "${command}"`);
  }
});

client.login(process.env.DISCORD_TOKEN);
