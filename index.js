require("dotenv").config();
require("./utils/date");
require("./utils/slash");
const interactions = require("./interactions");
const { init, getSubscribed } = require("./database");

const emojis = require("./emojis");
const messages = require("./messages");
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const hours = process.env.HOURS.split(",");
const weeks = process.env.PRESENCE_WEEKS.split(",");

const sended = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  await init();
  const channel = client.channels.cache.get(process.env.CHANNEL_ID);
  checkTimeLoop(channel);
  interactions(client);
});

const checkTimeLoop = (channel) => {
  setInterval(async () => {
    const d = new Date();
    // Check date match and not already sended
    const dateCutHours = new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDay(),
      d.getHours()
    );

    if (
      hours.includes(d.getHours().toString()) && // Valid hour
      weeks.indexOf(d.getWeek().toString()) !== -1 && // Valid week
      !d.isWeekend() && // Not a weekend
      !sended.includes(dateCutHours.toString()) // Not already sended
    ) {
      try {
        const message =
          messages[getRandomInt(messages.length)] +
          emojis[getRandomInt(emojis.length)] +
          "\n" +
          process.env.MOODLE_URL;
        // Send to the channel
        channel.send(message);
        console.log("message sended");
        // Send to all subscribed users
        const subscribed = await getSubscribed();
        subscribed.forEach((userId) => {
          client.users.fetch(userId, false).then((user) => {
            user.send(message);
            console.log(`message sended to ${userId}`);
          });
        });

        sended.push(dateCutHours.toString());
      } catch (e) {
        console.error(e);
      }
    }
  }, 1000 * 60 * 30); // 10 sec
};

client.login(process.env.BOT_TOKEN);
