import { Client, Message } from "discord.js";
import { Command } from "../../index";

export const command: Command = {
  name: "md",
  aliases: ["spam"],

  async run(client, message, args) {
    
    const id = args[0]
    
    const text_input = args.slice(1).join(' ')
  
    const user = (await client.users.fetch(id))

    try {
      user.send(text_input);
      return message.channel.send(
        `Enviando el mensaje a ${user.username}`
      );
    } catch {
      return message.channel.send(
        "parece que este usuario tiene bloqueada la opción de recibir mensajes"
      );
    }
  },

};
