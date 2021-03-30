import { client, EventFunction } from "..";

export const event:EventFunction = {

  event: "ready",

  once: false,

  run() {
    console.log("Bot ejecutado correctamente.");
    client.user.setPresence({
      status: "online",
      activity: {
        name: "*help | Hecho por loops#6340 e ides#0001",
        type: "PLAYING",
      },
    });
  },
  
};
