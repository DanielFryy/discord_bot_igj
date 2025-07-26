import { REST, RESTPostAPIApplicationCommandsJSONBody, Routes } from "discord.js";
import { config } from "dotenv";

import { askMeCommand } from "./askMe";
import { brbCommand } from "./brb";
import { ibCommand } from "./ib";

config();

const registerCommands = async () => {
  const token = process.env.DISCORD_BOT_TOKEN;
  if (!token) throw new Error("Discord bot token is required.");

  // Default version is 10
  const rest = new REST().setToken(token);

  const commands: RESTPostAPIApplicationCommandsJSONBody[] = [brbCommand, ibCommand, askMeCommand];

  try {
    console.log("Started refreshing application (/) commands.");
    const clientId = process.env.DISCORD_CLIENT_ID;
    const guildId = process.env.DISCORD_GUILD_ID;
    if (!clientId) throw new Error("Discord client ID is required.");
    if (!guildId) throw new Error("Discord guild ID is required.");

    const fullRoute = Routes.applicationGuildCommands(clientId, guildId);

    await rest.put(fullRoute, { body: commands });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
};

registerCommands();
