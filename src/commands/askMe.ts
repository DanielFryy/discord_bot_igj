import { ApplicationCommandOptionType, RESTPostAPIApplicationCommandsJSONBody } from "discord.js";

export const askMeCommand: RESTPostAPIApplicationCommandsJSONBody = {
  name: "askme",
  description: "Ask me anything and I'll try to answer it.",
  options: [
    {
      name: "msg",
      description: "The question you want to ask me.",
      type: ApplicationCommandOptionType.String,
      required: true
    }
  ]
};
