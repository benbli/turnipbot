exports.buildDiscordId = (message) => {
  const { username, discriminator } = message.author;
  return `${username}#${discriminator}`;
};
