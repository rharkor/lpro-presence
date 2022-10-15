const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "ping",
    description: "Renvois Pong!",
  },
  {
    name: "subscribe",
    description:
      "Vous ajoute à la liste des personnes recevant un message privé de présence",
  },
  {
    name: "unsubscribe",
    description: "Vous retire de la liste des messages privé à envoyer",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
