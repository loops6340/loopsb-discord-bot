import { Client, Message, TextChannel } from "discord.js";
import { Command } from "../index";

import config from '../botconfig.json'

export const command: Command = {
  name: "msg",
  hidden: true,
  type: 'chat',
  /* Resumen de la funcionalidad de este comando: sirve para hacer que el bot diga algo 
  (como el comando repetir) pero esta vez mandando el comando desde otro server, 
  asi'nadie podría darse cuenta de quien fue el que lo escribió 
  */
  run: async (client: Client, message: Message, args: string[]) => {
  
    /* No cualquiera puede ejecutar esto, si la persona no está autorizada se retorna 
    este mensaje y no se analiza más del comando */
    if (!config.owner_ids.some((id: string) => message.author.id == id))
      return message.channel.send(
        "no estás autorizado para ejecutar este comando :p"
      );

    let texto = args.join(" ");
    /* Si la persona no escribe nada aparte del comando, se retorna este mensaje */
    if (!texto)
      return message.channel.send("Por favor, escribe lo que voy a decir.");
    /* Si ninguna de estas comparaciones interrumpe el proceso, se ejecutan estas lineads de codigo */
    const canalGeneral = client.channels.cache.get(process.env.GENERALCHANNEL); // la id del canal general de algún server

    (canalGeneral as TextChannel).send(texto);
    message.react("🆗");
  },
};
