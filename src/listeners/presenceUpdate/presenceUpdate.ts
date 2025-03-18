// Presence Update Listener
import dayjs from "dayjs";
import { ActivityType, type Client, type ClientEvents, Events, type Presence } from "discord.js";

import { CONSTANTS } from "../../config/constants";
import { logToThread } from "../../utils/log/log.utils";

const { DATE_FORMAT, TIME_ZONE } = CONSTANTS;

/**
 * Handles the logic when a user's presence status changes.
 *
 * @param client - The Discord client instance.
 * @param oldPresence - The old presence status.
 * @param newPresence - The new presence status.
 */
export const statusChangeHandler = async (client: Client, oldPresence: Presence | null, newPresence: Presence) => {
  const { status: oldStatus } = oldPresence ?? {};
  const { status: newStatus, member } = newPresence;
  if (oldStatus === newStatus) return;
  const { nickname, displayName, user } = member ?? {};
  const name = nickname ?? displayName ?? user?.username ?? "Unknown";
  const date = dayjs().tz(TIME_ZONE).format(DATE_FORMAT);
  let message = `${name} went from ${oldStatus} to ${newStatus} at ${date}`;
  if (oldStatus === "offline" && newStatus === "online") message = `${name} just came online at ${date}`;
  if (oldStatus === "online" && newStatus === "offline") message = `${name} just went offline at ${date}`;
  if (newStatus === "idle" || newStatus === "dnd") {
    const customActivity = newPresence?.activities.find(activity => activity.type === ActivityType.Custom);
    const { state } = customActivity ?? {};
    if (state) message = `${name} is now ${newStatus}, ${state} at ${date}`;
  }
  logToThread(client, name, message);
};

/**
 * Registers a listener for the 'presenceUpdate' event.
 * This listener handles the logic when a user's presence status changes.
 *
 * @param client - The Discord client instance.
 */
const presenceUpdateListener = (client: Client) => {
  const event = Events.PresenceUpdate;

  const listener = async (...args: ClientEvents[typeof event]) => {
    const [oldPresence, newPresence] = args;
    statusChangeHandler(client, oldPresence, newPresence);
  };

  client.on(event, listener);
};

export default presenceUpdateListener;
