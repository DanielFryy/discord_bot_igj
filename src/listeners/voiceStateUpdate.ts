// VoiceStateUpdate listener
import dayjs, { extend } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Client, ClientEvents, Events, GuildMember } from "discord.js";

import { getVoiceChannel } from "../utils/channel/channel.utils";
import { log } from "../utils/log/log.utils";

extend(utc);
extend(timezone);

/**
 * Registers a listener for the 'voiceStateUpdate' event.
 * This listener handles the logic when a user's voice state changes.
 *
 * @param client - The Discord client instance.
 */
const voiceStateUpdateListener = (client: Client) => {
  const dateFormat = "MM/DD/YYYY, HH:mm:ss";
  const activeTimezone = "America/Guayaquil";
  const event = Events.VoiceStateUpdate;

  /**
   * Handles the event when a user either left or joined a voice channel.
   *
   * @param action - The action performed by the user, either "left" or "joined".
   * @param channelId - The ID of the voice channel.
   * @param member - The GuildMember object representing the user.
   */
  const leftJoinedChannelHandler = (
    action: "left" | "joined",
    channelId: string | null,
    member: GuildMember | null
  ) => {
    const channel = getVoiceChannel(client, channelId);
    const channelName = channel?.name ?? channelId;
    const userName = member?.displayName;
    const date = dayjs().tz(activeTimezone).format(dateFormat);
    const message = `${userName} ${action} channel ${channelName} at ${date}`;
    log(client, message);
  };

  /**
   * Event listener for the 'voiceStateUpdate' event.
   * Handles the logic when a user's voice state changes.
   *
   * @param args - The arguments passed to the event listener.
   */
  const listener = (...args: ClientEvents[typeof event]) => {
    const [oldState, newState] = args;
    const { channelId: oldChannelId, member: oldMember } = oldState;
    const { channelId: newChannelId, member: newMember } = newState;
    if (newChannelId === null) {
      leftJoinedChannelHandler("left", oldChannelId, oldMember);
    } else if (oldChannelId === null) {
      leftJoinedChannelHandler("joined", newChannelId, newMember);
    } else {
      // This case happens when the user shares their screen so the channel changes
      if (oldChannelId === newChannelId) return;
      const oldChannel = getVoiceChannel(client, oldChannelId);
      const newChannel = getVoiceChannel(client, newChannelId);
      const oldChannelName = oldChannel?.name ?? oldChannelId;
      const newChannelName = newChannel?.name ?? newChannelId;
      const userName = newMember?.displayName;
      const date = dayjs().tz(activeTimezone).format(dateFormat);
      const message = `${userName} moved from channel ${oldChannelName} to channel ${newChannelName} at ${date}`;
      log(client, message);
    }
  };

  client.on(event, listener);
};

export default voiceStateUpdateListener;
