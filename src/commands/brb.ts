import { ApplicationCommandOptionType, RESTPostAPIApplicationCommandsJSONBody } from "discord.js";

export const brbCommand: RESTPostAPIApplicationCommandsJSONBody = {
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
};
