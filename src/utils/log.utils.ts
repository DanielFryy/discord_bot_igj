// Log utils
import { Client, TextChannel } from "discord.js";

import { getTextChannel } from "./channel.utils";

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
