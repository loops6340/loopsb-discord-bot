import { Client, Message } from "discord.js";
import { Command } from "../index";

export const command: Command = {
  name: "spam",
  aliases: ["dm"],
  type: 'chat',

  run: async (client: Client, message: Message, args: string[]) => {

    interface opciones {
      persona: string;
      veces: number;
      mensajeSpam: string;
    }

    async function spam(opciones: opciones) {

      if (!opciones.persona || !opciones.veces || !opciones.mensajeSpam)
        return "escribe correctamente el comando, se escribe: ``f!spam {id} {veces} {mensaje}``";
        
      if (opciones.veces > 50)
        return "señor, eso es mucho para mi, me puedo caer :c";
        
      for (let i = 0; i < opciones.veces; i++) {
        try {
          client.users.cache.get(opciones.persona).send(opciones.mensajeSpam).catch(() => {
            console.log("hubo un error")
            return "pues no puedo mandarle mensajes a esta persona"
          })
        } catch (e) {
          return "No puedo enviar mensajes a este usuario"
        }
      }
      
      return `Enviando MD's a ${(await client.users.fetch(opciones.persona)).username} ${opciones.veces} veces`
      
    }

    let discordOpciones = {
      persona: args[0],
      veces: parseInt(args[1]),
      mensajeSpam: args.slice(2).join(" "),
    };

    try {
      message.channel.send(await spam(discordOpciones));
    } catch (e) {
            
      console.log("hubo un error")
      message.channel.send("hubo un error, revisa bien si pusiste las cosas en el orden correcto, gracias")
    }

  },
};
