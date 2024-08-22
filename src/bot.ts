import { Client, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";

import interactionCreateListener from "./listeners/interactionCreate/interactionCreate";
import presenceUpdateListener from "./listeners/presenceUpdate/presenceUpdate";
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
    intents: [GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.Guilds, GatewayIntentBits.GuildPresences]
  });

  readyListener(client);
  voiceStateUpdateListener(client);
  interactionCreateListener(client);
  presenceUpdateListener(client);

  client.login(token);
};

startBot();
