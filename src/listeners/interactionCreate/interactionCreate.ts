// Interaction Create Listener
import { type ChatInputCommandInteraction, type Client, type ClientEvents, Events } from "discord.js";

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
  };

  client.on(event, chatInputCommandListener);
};

export default interactionCreateListener;
