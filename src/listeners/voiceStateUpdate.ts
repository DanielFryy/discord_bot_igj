// VoiceStateUpdate listener
import { Client, Events, GuildMember, TextChannel } from "discord.js";
import { VoiceState } from "discord.js";

import { getVoiceChannel } from "../utils/channel.utils";
import { log } from "../utils/log.utils";

const voiceStateUpdateListener = (client: Client) => {
  // TODO: change this name and think a better solution to handle the action
  const leftJoinedChannelHandler = (
    action: "left" | "joined",
    channelId: string | null,
    member: GuildMember | null
  ) => {
    const channel = getVoiceChannel(client, channelId);
    const channelName = channel?.name ?? channelId;
    const userName = member?.displayName;
    const date = new Date().toLocaleString();
    const message = `${userName} ${action} channel ${channelName} at ${date}`;
    log(client, message);
  };
  // TODO: Figure out a nice way of how to infer the types of client.on callback
  const handler = (oldState: VoiceState, newState: VoiceState) => {
    const { channelId: oldChannelId, member: oldMember } = oldState;
    const { channelId: newChannelId, member: newMember } = newState;
    if (newChannelId === null) {
      leftJoinedChannelHandler("left", oldChannelId, oldMember);
    } else if (oldChannelId === null) {
      leftJoinedChannelHandler("joined", newChannelId, newMember);
    } else {
      if (oldChannelId === newChannelId) return;
      const oldChannel = getVoiceChannel(client, oldChannelId);
      const newChannel = getVoiceChannel(client, newChannelId);
      const oldChannelName = oldChannel?.name ?? oldChannelId;
      const newChannelName = newChannel?.name ?? newChannelId;
      const userName = newMember?.displayName;
      const date = new Date().toLocaleString();
      const message = `${userName} moved from channel ${oldChannelName} to channel ${newChannelName} at ${date}`;
      log(client, message);
    }
  };
  client.on(Events.VoiceStateUpdate, handler);
};

export default voiceStateUpdateListener;
