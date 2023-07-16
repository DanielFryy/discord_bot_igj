// Ready listener
import { Client, Events } from "discord.js";

const readyListener = (client: Client) => {
  const handler = () => {
    const { user, application } = client;
    if (!user || !application) return;
    console.log(`${user.username} is online`);
  };
  client.on(Events.ClientReady, handler);
};

export default readyListener;
