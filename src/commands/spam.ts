import { Client, Message, User } from "discord.js";
import { Command } from "../index";
import { prefix } from '../botconfig.json'

export const command: Command = {
  name: "dm",
  aliases: ["spam"],
  category: 'chat',

  run: async (client: Client, message: Message, args: string[]) => {

    interface Options {
      user: User;
      veces: number;
      mensajeSpam: string;
    }

    async function spam(options: Options) {

      if (!options.user || !options.veces || !options.mensajeSpam)
        return `escribe correctamente el comando, se escribe: \`\`${prefix}spam {id} {veces} {mensaje}\`\``;
        
      if (options.veces > 50)
        return "Escribiste un número demasiado grande (máximo 50)";
      
      if (options.veces < 0)
        return "Ya se que pusiste un número negativo, no te hagas el gracioso";

      try {
        for (let i = 0; i < options.veces; i++) {
          options.user.send(options.mensajeSpam)
        }
        return `Enviando MD's a ${options.user.username} ${options.veces} veces`
     } catch {
      return 'parece que este usuario tiene bloqueada la opción de recibir mis mensajes'
     }
    }


    try {

      let discordoptions:Options = {
        user: await client.users.fetch(args[0]),
        veces: parseInt(args[1]),
        mensajeSpam: args.slice(2).join(" "),
      };
      
      message.channel.send(await spam(discordoptions));
    } catch {
      message.channel.send(
        `pues parece que esta persona no existe, o quizá escribiste mal el comando: 
        \`\`${prefix}spam {id} {veces} {mensaje}\`\` `
      )
    }

  },
};
