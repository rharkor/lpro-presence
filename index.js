require("dotenv").config();
const emojis = require("./emojis")
const messages = require("./messages")
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const hours = process.env.HOURS.split(",");

const sended = [];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  const channel = client.channels.cache.get(process.env.CHANNEL_ID);
  checkTimeLoop(channel);
});

const checkTimeLoop = (channel) => {
  setInterval(() => {
    const d = new Date();
    // Check date match and not already sended
    const dateCutHours = new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDay(),
      d.getHours()
    );
    if (
      hours.includes(d.getHours().toString()) &&
      !sended.includes(dateCutHours.toString())
    ) {
      try {
          channel.send(messages[getRandomInt(messages.length)] + emojis[getRandomInt(emojis.length)] + "\n" + process.env.MOODLE_URL);
          console.log("message sended");
          sended.push(dateCutHours.toString());
      } catch (e) {
        console.error(e);
      }
    }
  }, 1000 * 10); // 10 sec
};

client.login(process.env.BOT_TOKEN);
