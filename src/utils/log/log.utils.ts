// Log utils
import { Client, TextChannel, ThreadAutoArchiveDuration, ThreadChannel } from "discord.js";

import { getLogsChannel } from "../channel/channel.utils";

/**
 * Sends a log message to the logs channel.
 * @param client - The Discord client.
 * @param message - The message to send to the logs channel.
 * @returns A Promise that resolves to the sent message.
 * @throws Error if the logs channel is not found.
 */
export const log = (client: Client, ...message: Parameters<TextChannel["send"]>) => {
  const logsChannel = getLogsChannel(client);
  if (!logsChannel) throw new Error("Cannot find the logs channel");
  return logsChannel.send(...message);
};

export const logToThread = async (
  client: Client,
  threadName: string,
  ...message: Parameters<ThreadChannel["send"]>
) => {
  const logsChannel = getLogsChannel(client);
  if (!logsChannel) throw new Error("Cannot find the logs channel");
  const name = `log-${threadName}`;
  let thread = logsChannel.threads.cache.find(thread => thread.name === name);
  if (thread?.archived) thread.setArchived(false);
  if (!thread) {
    thread = await logsChannel.threads.create({
      name,
      reason: "Thread for logs.",
      autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek
    });
  }
  thread?.send(...message);
};
