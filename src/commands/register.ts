import { ApplicationCommandOptionType, REST, Routes } from "discord.js";
import { config } from "dotenv";

config();

const registerCommands = async () => {
  const token = process.env.DISCORD_BOT_TOKEN;
  if (!token) throw new Error("Discord bot token is required.");

  // Default version is 10
  const rest = new REST().setToken(token);

  const commands = [
    {
      name: "brb",
      description: "Let the others know you'll be right back in an amount of time. Max 15 minutes.",
      options: [
        {
          name: "time",
          description: "The amount of time you'll be right back. Max 15 minutes.",
          type: ApplicationCommandOptionType.Number,
          required: true
        }
      ]
    },
    {
      name: "ib",
      description: "Let the others know you're back from being right back."
    }
  ];

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
