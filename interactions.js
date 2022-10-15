const { subscribe } = require("./database");

const handleInteractions = (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return; // return if not a command

    if (interaction.commandName === "ping") {
      await interaction.reply("Pong!");
    }

    if (interaction.commandName === "subscribe") {
      await subscribe(interaction.user.id);
      await interaction.reply("Vous avez correctement ajouté à la liste ✅");
    }

    if (interaction.commandName === "unsubscribe") {
      await subscribe(interaction.user.id);
      await interaction.reply(
        "Vous avez été retiré de la liste des messages privé"
      );
    }
  });
};

module.exports = handleInteractions;
