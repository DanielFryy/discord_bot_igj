// Channel utils
import { Channel, Client, TextChannel, VoiceChannel } from "discord.js";

/**
 * Retrieves a channel from the Discord client's cache based on the provided channel ID.
 *
 * @template T - The type of channel to retrieve.
 * @param client - The Discord client instance.
 * @param channelId - The ID of the channel to retrieve.
 * @returns The channel object if found, otherwise undefined.
 * @throws Error if the channel ID is null.
 */
export const getChannel = <T extends Channel>(client: Client, channelId: string | null): T | undefined => {
  if (!channelId) throw new Error("Channel ID is required.");
  const channel = client.channels.cache.get(channelId);
  return channel as T;
};

/**
 * Retrieves a text channel from the client using the provided channel ID.
 *
 * @param client The Discord client instance.
 * @param channelId The ID of the text channel to retrieve.
 * @returns The text channel if found, or null if not found.
 */
export const getTextChannel = (client: Client, channelId: string | null) => {
  return getChannel<TextChannel>(client, channelId);
};

/**
 * Retrieves a voice channel from the client using the provided channel ID.
 *
 * @param client The Discord client instance.
 * @param channelId The ID of the voice channel to retrieve.
 * @returns The voice channel if found, or null if not found.
 */
export const getVoiceChannel = (client: Client, channelId: string | null) => {
  return getChannel<VoiceChannel>(client, channelId);
};

/**
 * Retrieves the logs channel from the client.
 *
 * @param client The Discord client instance.
 * @returns The logs channel if found, or null if not found.
 * @throws Error if the logs channel identifier is missing.
 */
export const getLogsChannel = (client: Client) => {
  const logsChannelId = process.env.DISCORD_LOGS_TEXT_CHANNEL_ID;
  if (!logsChannelId) throw new Error("Missing logs channel identifier");
  return getTextChannel(client, logsChannelId);
};
