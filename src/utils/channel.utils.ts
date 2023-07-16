// Channel utils
import { Client, TextChannel, VoiceChannel } from "discord.js";

export const getTextChannel = (client: Client, channelId: string | null) => {
  if (!channelId) return;
  const channel = client.channels.cache.get(channelId);
  if (!channel) return;
  return channel as TextChannel;
};

export const getVoiceChannel = (client: Client, channelId: string | null) => {
  if (!channelId) return;
  const channel = client.channels.cache.get(channelId);
  if (!channel) return;
  return channel as VoiceChannel;
};
