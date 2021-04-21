import { client, EventFunction } from "..";
import { prefix, ownerIds } from "../botconfig.json";

export const event: EventFunction = {
  event: "ready",

  once: false,

  async run() {
    const owners = await Promise.all(ownerIds.map(async (owner) => {
      const user = await client.users.fetch(owner);
      return user.tag;
    }));

    console.log("Bot ejecutado correctamente.");
    await client.user.setPresence({
      status: "online",
      activity: {
        name: `${prefix}help | Hecho por ${owners.join(", ")}`,
        type: "PLAYING",
      },
    });
  },
};
