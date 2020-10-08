require("dotenv").config();

const cron = require("node-cron");
const axios = require("axios");
const { Client } = require("discord.js");

const client = new Client();
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  // console.log(`Guilds ${client.guilds.cache.get("746768083091194027")}`);
  // const danielfryy = client.users.cache.get(process.env.DISCORD_MY_USER_ID);
  // client.guilds.cache.get("746768083091194027")
});

client.on("message", msg => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }
});

client.on("disconnect", () => {
  console.log("xxxDisconnects");
});

client.setInterval(() => {
  const channel = client.channels.cache.get(
    process.env.DISCORD_GENERAL_TEXT_CHANNEL_ID
  );
  axios
    .get("https://imgur.com", {
      headers: {
        "Content-Type": "text/html; charset=UTF-8"
      }
    })
    .then(res => {
      console.log("xxxRes", res.data);
    })
    .catch(err => console.log("xxxError", err));
  // for (const channel of client.channels.cache) {
  //   console.log("xxxChannel", channel);
  // }
  // channel.send("Pero cuenten algo ps");
  // console.log("xxxChannel", client.channels.cache.get("746768083707887677"));
  // try {
  //   await client.user.send("Pero cuenten algo ps");
  // } catch (error) {
  //   console.log("xxxError", error);
  // }
}, 10 * 1000);

// client.setInterval(() => {
//   client.destroy();
// }, 10 * 1000);

// Schedule tasks to be run on the server.
cron.schedule("30 22 * * *", () => {
  const channel = client.channels.cache.get(
    process.env.DISCORD_GENERAL_TEXT_CHANNEL_ID
  );
  const danielfryy = client.users.cache.get(process.env.DISCORD_MY_USER_ID);
  channel.send(`Ya anda a dormir ${danielfryy}`);
});

client.login(process.env.DISCORD_IGJ_TOKEN);
