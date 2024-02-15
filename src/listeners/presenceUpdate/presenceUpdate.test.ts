import { Client, Events, GatewayIntentBits } from "discord.js";

import presenceUpdateListener from "./presenceUpdate";

describe("presenceUpdateListener", () => {
  let client: Client;

  beforeEach(() => {
    client = new Client({
      intents: [GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.Guilds, GatewayIntentBits.GuildPresences]
    });
  });

  it("should register a listener for the PresenceUpdate event", () => {
    const onSpy = vi.spyOn(client, "on");
    presenceUpdateListener(client);
    expect(onSpy).toHaveBeenCalledWith(Events.PresenceUpdate, expect.any(Function));
  });
});
