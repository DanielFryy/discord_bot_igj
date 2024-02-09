import { Client, GatewayIntentBits, TextChannel } from "discord.js";
import { VoiceChannel } from "discord.js";

import { getChannel, getTextChannel, getVoiceChannel } from "./channel.utils";

let client: Client;
let channelId: string;

beforeEach(() => {
  client = new Client({
    intents: [GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.Guilds]
  });
  channelId = "1234567890";
});

describe("getChannel", () => {
  it("should return undefined if channelId is null", () => {
    const result = getChannel<TextChannel>(client, null);
    expect(result).toBeUndefined();
  });

  it("should return undefined if channel is not found", () => {
    client.channels.cache.get = vi.fn().mockReturnValue(null);
    const result = getChannel<TextChannel>(client, channelId);
    expect(result).toBeUndefined();
  });

  it("should return a text channel if channel is found", () => {
    const mockChannel = Object.create(TextChannel.prototype);
    client.channels.cache.get = vi.fn().mockReturnValue(mockChannel);
    const result = getChannel<TextChannel>(client, channelId);
    expect(result).toBe(mockChannel);
  });

  it("should return a voice channel if channel is found", () => {
    const mockChannel = Object.create(VoiceChannel.prototype);
    client.channels.cache.get = vi.fn().mockReturnValue(mockChannel);
    const result = getChannel<VoiceChannel>(client, channelId);
    expect(result).toBe(mockChannel);
  });
});

describe("getTextChannel", () => {
  it("should return a text channel if found", () => {
    const mockChannel = Object.create(TextChannel.prototype);
    client.channels.cache.get = vi.fn().mockReturnValue(mockChannel);
    const result = getTextChannel(client, channelId);
    expect(result).toBe(mockChannel);
  });

  it("should return undefined if not found", () => {
    client.channels.cache.get = vi.fn().mockReturnValue(null);
    const result = getTextChannel(client, channelId);
    expect(result).toBeUndefined();
  });
});

describe("getVoiceChannel", () => {
  it("should return a voice channel if found", () => {
    const mockChannel = Object.create(VoiceChannel.prototype);
    client.channels.cache.get = vi.fn().mockReturnValue(mockChannel);
    const result = getVoiceChannel(client, channelId);
    expect(result).toBe(mockChannel);
  });

  it("should return undefined if not found", () => {
    client.channels.cache.get = vi.fn().mockReturnValue(null);
    const result = getVoiceChannel(client, channelId);
    expect(result).toBeUndefined();
  });
});
