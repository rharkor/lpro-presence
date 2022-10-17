const { subscribe, unsubscribe } = require("./database");

const handleInteractions = (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return; // return if not a command

    if (interaction.commandName === "ping") {
      try {
        await interaction.reply({ content: "Pong!", ephemeral: true });
      } catch (e) {
        await interaction.reply({
          content: "Une erreure s'est produite...",
          ephemeral: true,
        });
      }
    }

    if (interaction.commandName === "subscribe") {
      try {
        await subscribe(interaction.user.id);
        await interaction.reply({
          content: "Vous avez correctement été ajouté à la liste ✅",
          ephemeral: true,
        });
      } catch (e) {
        await interaction.reply({
          content: "Une erreure s'est produite...",
          ephemeral: true,
        });
      }
    }

    if (interaction.commandName === "unsubscribe") {
      try {
        await unsubscribe(interaction.user.id);
        await interaction.reply({
          content: "Vous avez été retiré de la liste des messages privés",
          ephemeral: true,
        });
      } catch (e) {
        await interaction.reply({
          content: "Une erreure s'est produite...",
          ephemeral: true,
        });
      }
    }
  });
};

module.exports = handleInteractions;
