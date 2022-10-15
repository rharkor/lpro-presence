const { subscribe, unsubscribe } = require("./database");

const handleInteractions = (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return; // return if not a command

    if (interaction.commandName === "ping") {
      await interaction.reply("Pong!");
    }

    if (interaction.commandName === "subscribe") {
      try {
        await subscribe(interaction.user.id);
        await interaction.reply("Vous avez correctement ajouté à la liste ✅");
      } catch (e) {
        await interaction.reply("Une erreure s'est produite...");
      }
    }

    if (interaction.commandName === "unsubscribe") {
      try {
        await unsubscribe(interaction.user.id);
        await interaction.reply(
          "Vous avez été retiré de la liste des messages privé"
        );
      } catch (e) {
        await interaction.reply("Une erreure s'est produite...");
      }
    }
  });
};

module.exports = handleInteractions;
