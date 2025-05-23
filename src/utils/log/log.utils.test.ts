import { Client, GatewayIntentBits, TextChannel } from "discord.js";
import type { MockInstance } from "vitest";

import { log } from "./log.utils";

let client: Client;
let message: Parameters<TextChannel["send"]>[number];
let getTextChannel: MockInstance;

beforeEach(() => {
  client = new Client({
    intents: [GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.Guilds]
  });
  message = "Test message";
  getTextChannel = vi.fn().mockReturnValue(Object.create(TextChannel.prototype));
  vi.stubEnv("DISCORD_LOGS_TEXT_CHANNEL_ID", "1234567890");
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("log", () => {
  it("should throw an error if logs channel identifier is missing", () => {
    vi.stubEnv("DISCORD_LOGS_TEXT_CHANNEL_ID", "");
    expect(() => log(client, message)).toThrow("Missing logs channel identifier");
  });

  it("should throw an error if cannot find the logs channel", () => {
    getTextChannel.mockReturnValue(null);
    expect(() => log(client, message)).toThrow("Cannot find the logs channel");
  });

  it("should send a message to the logs channel", () => {
    const mockTextChannel = Object.create(TextChannel.prototype);
    mockTextChannel.send = vi.fn();
    const sendSpy = vi.spyOn(mockTextChannel, "send");
    // Mock client.channels.cache.get() to return mockTextChannel
    client.channels.cache.get = vi.fn().mockReturnValue(mockTextChannel);
    log(client, message);
    expect(sendSpy).toHaveBeenCalledWith(message);
  });
});
