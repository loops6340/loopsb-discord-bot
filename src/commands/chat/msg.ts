import { Client, Message, TextChannel } from "discord.js";
import { Command } from "../../index";

import config from '../../botconfig.json'

/* 
  Resumen de la funcionalidad de este comando: sirve para hacer que el bot diga algo 
  (como el comando repetir) pero esta vez mandando el comando desde otro server, 
  asi nadie podría darse cuenta de quien fue el que lo escribió 
*/

export const command: Command = {
  name: "msg",
  hidden: true,

  async run(client, message, args) {
  
    /* No cualquiera puede ejecutar esto, si la persona no está autorizada se retorna 
    este mensaje y no se analiza más del comando */
    if (!config.ownerIds.some((id: string) => message.author.id == id))
      return message.channel.send(
        "no estás autorizado para ejecutar este comando :p"
      );

      const channelId = args[0]
      const text = args.slice(1).join(" ");
      /* Si la persona no escribe nada aparte del comando, se retorna este mensaje */
      try {
        client.channels.cache.get(channelId);
      } catch {
        return message.channel.send(
          'el primer argumento que proporcionaste debe ser la id del canal al que quieres mandar el mensaje'
        )
      }

      const channel = client.channels.cache.get(channelId);

      if (!text)
        return message.channel.send("Por favor, escribe lo que voy a decir.");
      /* Si ninguna de estas comparaciones interrumpe el proceso, se ejecutan estas lineads de codigo */
      // la id del canal de algún server

      (channel as TextChannel).send(text);
      message.react("🆗");
  },
};
