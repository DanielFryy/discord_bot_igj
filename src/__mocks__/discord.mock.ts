/**
 * Mocks the "discord.js" module for testing purposes.
 * @remarks
 * This module provides mock implementations for the Client, TextChannel, and VoiceChannel classes,
 * as well as the GatewayIntentBits object.
 */
vi.mock("discord.js", () => {
  const GatewayIntentBits = {
    GuildVoiceStates: 128,
    Guilds: 1,
    GuildPresences: 256
  };

  const Events = {
    ClientReady: "ready",
    PresenceUpdate: "presenceUpdate"
  };

  return {
    /**
     * Mock implementation of the Client class.
     * @returns A mock instance of the Client class.
     */
    Client: vi.fn().mockImplementation(() => {
      return {
        channels: {
          cache: {
            /**
             * Mock implementation of the get method.
             * @returns A mock instance of the get method.
             */
            get: vi.fn()
          }
        },
        once: vi.fn(),
        on: vi.fn()
      };
    }),
    Events,
    GatewayIntentBits,
    /**
     * Mock implementation of the TextChannel class.
     * @returns A mock instance of the TextChannel class.
     */
    TextChannel: vi.fn().mockImplementation(() => {
      return {
        /**
         * Mock implementation of the send method.
         * @returns A mock instance of the send method.
         */
        send: vi.fn()
      };
    }),
    /**
     * Mock implementation of the VoiceChannel class.
     * @returns A mock instance of the VoiceChannel class.
     */
    VoiceChannel: vi.fn().mockImplementation(() => {
      return {};
    }),
    Interaction: vi.fn().mockImplementation(() => {
      return {
        isChatInputCommand: vi.fn()
      };
    }),
    ChatInputCommandInteraction: vi.fn().mockImplementation(() => {
      return {
        commandName: "someCommand",
        reply: vi.fn(),
        options: {
          getNumber: vi.fn()
        },
        user: {
          send: vi.fn()
        },
        guild: {
          name: "Test Server"
        }
      };
    })
  };
});
