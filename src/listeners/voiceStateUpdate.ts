// VoiceStateUpdate listener
import { Client, VoiceState } from "discord.js";

// TODO: send results to a logs channel
const voiceStateUpdateListener = (client: Client) => {
  const handler = (oldState: VoiceState, newState: VoiceState) => {
    const { channelId: oldChannelId, member: oldMember } = oldState;
    const { channelId: newChannelId, member: newMember } = newState;
    if (newChannelId === null) {
      const channel = client.channels.cache.get(oldChannelId ?? "");
      // @ts-ignore The name property does exist
      const channelName = channel?.name ?? oldChannelId;
      const userName = oldMember?.displayName;
      const date = new Date().toLocaleString();
      console.log(`${userName} left channel ${channelName} at ${date}`);
    } else if (oldChannelId === null) {
      const channel = client.channels.cache.get(newChannelId ?? "");
      // @ts-ignore The name property does exist
      const channelName = channel?.name ?? newChannelId;
      const userName = newMember?.displayName;
      const date = new Date().toLocaleString();
      console.log(`${userName} joined channel ${channelName} at ${date}`);
    } else {
      const oldChannel = client.channels.cache.get(oldChannelId ?? "");
      const newChannel = client.channels.cache.get(newChannelId ?? "");
      // @ts-ignore The name property does exist
      const oldChannelName = oldChannel?.name ?? oldChannelId;
      // @ts-ignore The name property does exist
      const newChannelName = newChannel?.name ?? newChannelId;
      const userName = newMember?.displayName;
      const date = new Date().toLocaleString();
      console.log(
        `${userName} moved channels: from ${oldChannelName} to ${newChannelName} at ${date}`
      );
    }
  };
  client.on("voiceStateUpdate", handler);
};

export default voiceStateUpdateListener;
