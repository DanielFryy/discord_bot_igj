// Log utils
import { Client, TextChannel } from "discord.js";

import { getTextChannel } from "../channel/channel.utils";

/**
 * Sends a log message to the logs channel.
 * @param client - The Discord client.
 * @param message - The message to send to the logs channel.
 * @returns A Promise that resolves to the sent message.
 * @throws Error if the logs channel identifier is missing or if the logs channel cannot be found.
 */
export const log = (
  client: Client,
  ...message: Parameters<TextChannel["send"]>
) => {
  const logsChannelId = process.env.DISCORD_LOGS_TEXT_CHANNEL_ID;
  if (!logsChannelId) throw new Error("Missing logs channel identifier");
  const logsChannel = getTextChannel(client, logsChannelId);
  if (!logsChannel) throw new Error("Cannot find the logs channel");
  return logsChannel.send(...message);
};
