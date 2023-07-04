// Ready listener
import { Client } from "discord.js";

const readyListener = (client: Client) => {
  const handler = () => {
    const { user, application } = client;
    if (!user || !application) return;
    console.log(`${user.username} is online`);
  };
  client.on("ready", handler);
};

export default readyListener;
