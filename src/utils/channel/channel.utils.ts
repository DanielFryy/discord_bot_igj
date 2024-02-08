// Channel utils
import { Client, TextChannel, VoiceChannel } from "discord.js";

/**
 * Retrieves a text channel from the Discord client's cache based on the provided channel ID.
 * @param client - The Discord client instance.
 * @param channelId - The ID of the channel to retrieve.
 * @returns The text channel if found, or undefined if not found.
 */
export const getTextChannel = (client: Client, channelId: string | null) => {
  if (!channelId) return;
  const channel = client.channels.cache.get(channelId);
  if (!channel) return;
  return channel as TextChannel;
};

/**
 * Retrieves a voice channel from the client's cache based on the provided channel ID.
 * @param client - The Discord client instance.
 * @param channelId - The ID of the voice channel to retrieve.
 * @returns The voice channel if found, otherwise undefined.
 */
export const getVoiceChannel = (client: Client, channelId: string | null) => {
  if (!channelId) return;
  const channel = client.channels.cache.get(channelId);
  if (!channel) return;
  return channel as VoiceChannel;
};
