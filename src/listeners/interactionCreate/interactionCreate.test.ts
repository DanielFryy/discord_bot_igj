import { ChatInputCommandInteraction } from "discord.js";

import { brbCommandHandler, ibCommandHandler } from "./interactionCreate";

describe("brbCommandHandler", () => {
  // FIXME: Figure out how to type interaction
  let interaction: any;

  beforeEach(() => {
    interaction = {
      commandName: "brb",
      options: {
        getNumber: vi.fn()
      },
      reply: vi.fn(),
      user: {
        send: vi.fn()
      },
      guild: {
        name: "Test Server"
      }
    };
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should not reply when commandName is not 'brb'", async () => {
    interaction.commandName = "otherCommand";
    await brbCommandHandler(interaction);
    expect(interaction.reply).not.toHaveBeenCalled();
  });

  it("getNumber should be called with 'time' when commandName is 'brb'", async () => {
    await brbCommandHandler(interaction);
    expect(interaction.options.getNumber).toHaveBeenCalledWith("time");
  });

  it("should throw an error if time command is not found", async () => {
    interaction.options.getNumber = vi.fn().mockReturnValue(null);
    const result = brbCommandHandler(interaction);
    await expect(result).rejects.toThrow("Time is required.");
  });

  it("should reply with an error if time is less than 1", async () => {
    interaction.options.getNumber = vi.fn().mockReturnValue(0);
    await brbCommandHandler(interaction);
    expect(interaction.reply).toHaveBeenCalledWith({
      content: "You can't be right back for less than 1 minute.",
      ephemeral: true
    });
  });

  it("should reply with an error if time is not an integer", async () => {
    interaction.options.getNumber = vi.fn().mockReturnValue(1.5);
    await brbCommandHandler(interaction);
    expect(interaction.reply).toHaveBeenCalledWith({ content: "The time must be a whole number.", ephemeral: true });
  });

  it("should reply with an error if time is greater than 15", async () => {
    interaction.options.getNumber = vi.fn().mockReturnValue(16);
    await brbCommandHandler(interaction);
    expect(interaction.reply).toHaveBeenCalledWith({
      content: "You can't be right back for more than 15 minutes.",
      ephemeral: true
    });
  });

  it("should reply with the correct message and send a DM after the specified time", async () => {
    const time = 5;
    interaction.options.getNumber = vi.fn().mockReturnValue(time);
    await brbCommandHandler(interaction);
    expect(interaction.reply).toHaveBeenCalledWith(`I'll be right back in ${time} minutes.`);
    vi.advanceTimersByTime(time * 60 * 1000);
    expect(interaction.user.send).toHaveBeenCalledWith(
      `You should be back by now in the server ${interaction.guild?.name}`
    );
  });
});

describe("ibCommandHandler", () => {
  it("should reply with 'I'm back!' when commandName is 'ib'", async () => {
    const interaction = Object.create(ChatInputCommandInteraction.prototype);
    interaction.commandName = "ib";
    interaction.reply = vi.fn();
    await ibCommandHandler(interaction);
    expect(interaction.reply).toHaveBeenCalledWith("I'm back!");
  });

  it("should not reply when commandName is not 'ib'", async () => {
    const interaction = Object.create(ChatInputCommandInteraction.prototype);
    interaction.commandName = "otherCommand";
    interaction.reply = vi.fn();
    await ibCommandHandler(interaction);
    expect(interaction.reply).not.toHaveBeenCalled();
  });
});
