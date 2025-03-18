// VoiceStateUpdate listener
import dayjs, { extend } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { type Client, type ClientEvents, Events, type GuildMember } from "discord.js";

import { CONSTANTS } from "../config/constants";
import { getVoiceChannel } from "../utils/channel/channel.utils";
import { logToThread } from "../utils/log/log.utils";

extend(utc);
extend(timezone);

const { DATE_FORMAT, TIME_ZONE } = CONSTANTS;

/**
 * Registers a listener for the 'voiceStateUpdate' event.
 * This listener handles the logic when a user's voice state changes.
 *
 * @param client - The Discord client instance.
 */
const voiceStateUpdateListener = (client: Client) => {
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
    const memberName = member?.nickname ?? member?.displayName ?? member?.user?.username ?? "Unknown";
    const date = dayjs().tz(TIME_ZONE).format(DATE_FORMAT);
    const message = `${memberName} ${action} channel ${channelName} at ${date}`;
    logToThread(client, memberName, message);
  };

  /**
   * Handles the event when a user joins a voice channel.
   *
   * @param channelId - The ID of the voice channel.
   * @param member - The GuildMember object representing the user.
   */
  const joinedChannelHandler = (channelId: string | null, member: GuildMember | null) => {
    leftJoinedChannelHandler("joined", channelId, member);
  };

  /**
   * Handles the event when a user leaves a voice channel.
   *
   * @param channelId - The ID of the voice channel.
   * @param member - The GuildMember object representing the user.
   */
  const leftChannelHandler = (channelId: string | null, member: GuildMember | null) => {
    leftJoinedChannelHandler("left", channelId, member);
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
    if (newChannelId === null) leftChannelHandler(oldChannelId, oldMember);
    else if (oldChannelId === null) joinedChannelHandler(newChannelId, newMember);
    else {
      // This case happens when the user shares their screen so the channel changes
      if (oldChannelId === newChannelId) return;
      const oldChannel = getVoiceChannel(client, oldChannelId);
      const newChannel = getVoiceChannel(client, newChannelId);
      const oldChannelName = oldChannel?.name ?? oldChannelId;
      const newChannelName = newChannel?.name ?? newChannelId;
      const memberName = newMember?.nickname ?? newMember?.displayName ?? newMember?.user?.username ?? "Unknown";
      const date = dayjs().tz(TIME_ZONE).format(DATE_FORMAT);
      const message = `${memberName} moved from channel ${oldChannelName} to channel ${newChannelName} at ${date}`;
      logToThread(client, memberName, message);
    }
  };

  client.on(event, listener);
};

export default voiceStateUpdateListener;
