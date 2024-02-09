import { Client, GatewayIntentBits, TextChannel } from "discord.js";
import { VoiceChannel } from "discord.js";

import { getTextChannel, getVoiceChannel } from "./channel.utils";

let client: Client;
let channelId: string;

beforeEach(() => {
  client = new Client({
    intents: [GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.Guilds]
  });
  channelId = "1234567890";
});

describe("getTextChannel", () => {
  it("should return undefined if channelId is null", () => {
    const result = getTextChannel(client, null);
    expect(result).toBeUndefined();
  });

  it("should return undefined if channel is not found", () => {
    client.channels.cache.get = vi.fn().mockReturnValue(null);
    const result = getTextChannel(client, channelId);
    expect(result).toBeUndefined();
  });

  it("should return a TextChannel if channel is found", () => {
    const mockTextChannel = Object.create(TextChannel.prototype);
    client.channels.cache.get = vi.fn().mockReturnValue(mockTextChannel);
    const result = getTextChannel(client, channelId);
    expect(result).toBe(mockTextChannel);
  });
});

describe("getVoiceChannel", () => {
  it("should return undefined if channelId is null", () => {
    const result = getVoiceChannel(client, null);
    expect(result).toBeUndefined();
  });

  it("should return undefined if channel is not found", () => {
    client.channels.cache.get = vi.fn().mockReturnValue(null);
    const result = getVoiceChannel(client, channelId);
    expect(result).toBeUndefined();
  });

  it("should return a VoiceChannel if channel is found", () => {
    const mockVoiceChannel = Object.create(VoiceChannel.prototype);
    client.channels.cache.get = vi.fn().mockReturnValue(mockVoiceChannel);
    const result = getVoiceChannel(client, channelId);
    expect(result).toBe(mockVoiceChannel);
  });
});
