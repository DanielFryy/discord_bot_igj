import { Client, Events, GatewayIntentBits } from "discord.js";
import { MockInstance } from "vitest";

import readyListener from "./ready";

let client: Client;
let consoleLogSpy: MockInstance;

beforeEach(() => {
  client = new Client({
    intents: [GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.Guilds]
  });
  consoleLogSpy = vi.spyOn(console, "log");
  consoleLogSpy.mockClear();
});

describe("readyListener", () => {
  it("should register a listener for the ClientReady event", () => {
    const onceSpy = vi.spyOn(client, "once");
    readyListener(client);
    expect(onceSpy).toHaveBeenCalledWith(Events.ClientReady, expect.any(Function));
  });

  it("should not log if user or application is not defined", () => {
    readyListener(client);
    expect(consoleLogSpy).not.toHaveBeenCalled();
  });
});
