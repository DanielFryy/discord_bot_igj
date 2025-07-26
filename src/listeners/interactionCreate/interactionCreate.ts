// Interaction Create Listener
import type { ChatInputCommandInteraction, Client, ClientEvents } from "discord.js";
import { DiscordAPIError, Events, MessageFlags } from "discord.js";
import OpenAI, { APIError } from "openai";

/**
 * Handles the BRB (Be Right Back) command.
 *
 * @param interaction - The interaction object.
 */
export const brbCommandHandler = async (interaction: ChatInputCommandInteraction) => {
  if (interaction.commandName !== "brb") return;
  const time = interaction.options.getNumber("time");
  // If time is an object, it means it's null.
  if (typeof time === "object") throw new Error("Time is required.");
  // Min 1 minute
  if (time < 1) {
    await interaction.reply({ content: "You can't be right back for less than 1 minute.", ephemeral: true });
    return;
  }
  // Check if time is an integer
  if (!Number.isInteger(time)) {
    await interaction.reply({ content: "The time must be a whole number.", ephemeral: true });
    return;
  }
  // Max 15 minutes
  if (time > 15) {
    await interaction.reply({ content: "You can't be right back for more than 15 minutes.", ephemeral: true });
    return;
  }
  await interaction.reply(`I'll be right back in ${time} minutes.`);
  // Send a DM to the user after the time has passed to let them know they should be back.
  setTimeout(
    async () => {
      await interaction.user.send(`You should be back by now in the server ${interaction.guild?.name}`);
    },
    time * 60 * 1000
  );
};

/**
 * Handles the IB (I'm Back) command.
 *
 * @param interaction - The interaction object.
 */
export const ibCommandHandler = async (interaction: ChatInputCommandInteraction) => {
  if (interaction.commandName !== "ib") return;
  await interaction.reply("I'm back!");
};

const sanitizeContent = (content: string | null): string[] => {
  if (!content) return ["Sorry, I couldn't generate a response."];
  // Split the content into chunks of 2000 characters or less
  const chunks: string[] = [];
  for (let i = 0; i < content.length; i += 2000) {
    chunks.push(content.slice(i, i + 2000));
  }
  return chunks;
};

export const askMeCommandHandler = async (interaction: ChatInputCommandInteraction) => {
  if (interaction.commandName !== "askme") return;
  const msg = interaction.options.getString("msg");
  if (typeof msg !== "string" || msg.length === 0) throw new Error("Message is required.");
  if (msg.length > 1000) {
    await interaction.reply({
      content: "The message is too long. Please keep it under 1000 characters.",
      flags: MessageFlags.Ephemeral
    });
    return;
  }

  const aiClient = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
      "HTTP-Referer": "https://www.github.com/DanielFryy",
      "X-Title": "Discord Bot using OpenRouter"
    }
  });

  try {
    const response = await aiClient.chat.completions.create({
      model: "tngtech/deepseek-r1t2-chimera:free",
      messages: [{ role: "user", content: msg }]
    });
    let { content } = response.choices[0].message;
    console.log("content", { type: typeof content, length: content?.length, content });

    if (content?.startsWith("<answer>") && content.endsWith("</answer>")) {
      content = content
        .split("+")
        .join("")
        .replace(/<\/?answer>/g, "")
        .trim();
    }

    const sanitizedContent = sanitizeContent(content);

    console.log("sanitizedContent", { chunks: sanitizedContent.length, content: sanitizedContent });

    for (const chunk of sanitizedContent) {
      await interaction.reply(chunk);
    }
  } catch (e) {
    const isDiscordAPIError = e instanceof DiscordAPIError;
    const isAPIError = e instanceof APIError;
    if (isDiscordAPIError) {
      const { message } = e;
      console.error("Discord API Error:", message);
    }
    if (isAPIError) {
      const { status, code, type, error } = e;
      console.error("OpenAI API Error:", { status, code, type, error });
    }
    // await interaction.reply({
    //   content: `An error occurred while processing your request. Please try again later. Error: ${error?.message ?? rawError.message}`,
    //   flags: MessageFlags.Ephemeral
    // });
  }
};

/**
 * Sets up a listener for the 'interactionCreate' event.
 *
 * @param client - The Discord client instance.
 */
const interactionCreateListener = (client: Client) => {
  const event = Events.InteractionCreate;

  const chatInputCommandListener = async (...args: ClientEvents[typeof event]) => {
    const [interaction] = args;
    if (!interaction.isChatInputCommand()) return;
    brbCommandHandler(interaction);
    ibCommandHandler(interaction);
    askMeCommandHandler(interaction);
  };

  client.on(event, chatInputCommandListener);
};

export default interactionCreateListener;
