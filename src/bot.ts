import { Client, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
// import cron from "node-cron";

// import fetch from "node-fetch";
import interactionCreateListener from "./listeners/interactionCreate/interactionCreate";
import readyListener from "./listeners/ready/ready";
import voiceStateUpdateListener from "./listeners/voiceStateUpdate";

config();

/**
 * Starts the Discord bot.
 */
const startBot = () => {
  const token = process.env.DISCORD_BOT_TOKEN;
  if (!token) throw new Error("Discord bot token is required.");
  const client = new Client({
    intents: [GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.Guilds]
  });

  readyListener(client);
  voiceStateUpdateListener(client);
  interactionCreateListener(client);

  // Schedule tasks to be run on the server.
  // cron.schedule("30 22 * * *", () => {
  //   const channel = client.cache.get(
  //     process.env.DISCORD_GENERAL_TEXT_CHANNEL_ID!
  //   );
  //   const danielfryy = client.users.cache.get(process.env.DISCORD_MY_USER_ID!);
  //   channel?.send(`Ya anda a dormir ${danielfryy}`);
  // });

  // cron.schedule("30 23 * * *", () => {
  //   const channel = client.channels.cache.get(
  //     process.env.DISCORD_GENERAL_TEXT_CHANNEL_ID
  //   );
  //   const danielfryy = client.users.cache.get(process.env.DISCORD_MY_USER_ID);
  //   channel.send(`Que ya vayas a dormir pto ${danielfryy}`);
  // });

  // let lastUrl = "";

  // cron.schedule("30 * * * *", () => {
  //   const channel = client.channels.cache.get(
  //     process.env.DISCORD_MEMES_TEXT_CHANNEL_ID
  //   );
  //   fetch("https://9gag.com/v1/group-posts/group/funny/type/hot")
  //     .then(res => res.json())
  //     .then(res => {
  //       const { data } = res;
  //       const { posts } = data;
  //       const [firstPost] = posts;
  //       const { url } = firstPost || {};
  //       if (url === lastUrl) {
  //         channel.send("Está el mismo meme de antes, ya nada =(.");
  //         return;
  //       }
  //       lastUrl = url;
  //       channel.send(url ? url : "Algo falló obteniendo la url del post =(.");
  //     })
  //     .catch(err => console.log("xxxError", err));
  // });

  client.login(token);
};

startBot();
