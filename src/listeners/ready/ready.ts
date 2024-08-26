// Ready listener
import { type Client, ClientEvents, Events } from "discord.js";

/**
 * Sets up a listener for the 'ready' event.
 *
 * @param client - The Discord client instance.
 */
const readyListener = (client: Client) => {
  const event = Events.ClientReady;

  const listener = (...args: ClientEvents[typeof event]) => {
    const [client] = args;
    const { user, application } = client;
    if (!user || !application) return;
    console.log(`${user.username} is online`);
  };

  client.once(event, listener);
};

export default readyListener;
