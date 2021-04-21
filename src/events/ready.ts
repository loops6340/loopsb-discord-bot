import { client, EventFunction } from "..";
import { prefix } from '../botconfig.json'

export const event:EventFunction = {

  event: "ready",

  once: false,

  run() {
    console.log("Bot ejecutado correctamente.");
    client.user.setPresence({
      status: "online",
      activity: {
        name: `${prefix}help | Hecho por loops#6340 e ides#0047`,
        type: "PLAYING",
      },
    });
   
  },
  
};
