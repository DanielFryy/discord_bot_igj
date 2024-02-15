// Interaction Create Listener
import { ChatInputCommandInteraction, Client, Events, Interaction } from "discord.js";

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

export const ibCommandHandler = async (interaction: ChatInputCommandInteraction) => {
  if (interaction.commandName !== "ib") return;
  await interaction.reply("I'm back!");
};

export const chatInputCommandListener = async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;
  brbCommandHandler(interaction);
  ibCommandHandler(interaction);
};

const interactionCreateListener = async (client: Client) => {
  const event = Events.InteractionCreate;
  client.on(event, chatInputCommandListener);
};

export default interactionCreateListener;
