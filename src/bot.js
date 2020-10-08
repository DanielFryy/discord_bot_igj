require("dotenv").config();

const cron = require("node-cron");
const fetch = require("node-fetch");
const { Client } = require("discord.js");

const client = new Client();

const handlePingPongMsgs = msg => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }
};

const handleBotMentions = msg => {
  const botWasMentioned = msg.mentions.users.has(
    process.env.DISCORD_IGJ_BOT_USER_ID
  );
  if (botWasMentioned) {
    msg.reply("no entendí pero por si acaso, tu mamá.");
  }
};

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  handlePingPongMsgs(msg);
  handleBotMentions(msg);
});

// Schedule tasks to be run on the server.
cron.schedule("30 22 * * *", () => {
  const channel = client.channels.cache.get(
    process.env.DISCORD_GENERAL_TEXT_CHANNEL_ID
  );
  const danielfryy = client.users.cache.get(process.env.DISCORD_MY_USER_ID);
  channel.send(`Ya anda a dormir ${danielfryy}`);
});

cron.schedule("30 * * * *", () => {
  const channel = client.channels.cache.get(
    process.env.DISCORD_MEMES_TEXT_CHANNEL_ID
  );
  fetch("https://9gag.com/v1/group-posts/group/wtf/type/latest")
    .then(res => res.json())
    .then(res => {
      const { data } = res;
      const { posts } = data;
      const [firstPost] = posts;
      const { url } = firstPost || {};
      channel.send(url ? url : "Algo falló obteniendo la url del post =(.");
    })
    .catch(err => console.log("xxxError", err));
});

client.login(process.env.DISCORD_IGJ_TOKEN);
