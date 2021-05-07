import { Client, Message, User } from "discord.js";
import { Command } from "../index";
import { prefix } from "../botconfig.json";
import yargs, { string } from "yargs";
import { code } from "../utils/embed-utils";

export const command: Command = {
  name: "md",
  aliases: ["spam"],
  category: "chat",

  run: async (client: Client, message: Message, args: string[]) => {
    
    const argsParsed = yargs
      .options({
        user: { type: "string", alias: "u", required: true },
        repeat: { type: "number", alias: "r", default: 1 },
        message: { type: "string", alias: "m", required: true },
      })
      .fail((msg, err, sin) => {
        console.log(msg);
        return message.channel.send(msg);
      })
      .parse(args)

    const user = (await client.users.fetch(argsParsed.user))
    
    if(!argsParsed.message || !argsParsed.repeat || !argsParsed.user) return;

    if (argsParsed.repeat > 50)
      return message.channel.send(
        "Escribiste un número demasiado grande (máximo 50)"
      );

    if (argsParsed.repeat < 0)
      return message.channel.send(
        "Ya se que pusiste un número negativo, no te hagas el gracioso"
      );
    try {
      for (let i = 0; i < argsParsed.repeat; i++) {
        user.send(argsParsed.message);
      }
      return message.channel.send(
        `Enviando ${argsParsed.repeat} mensaje(s) ${user.username}`
      );
    } catch {
      return message.channel.send(
        "parece que este usuario tiene bloqueada la opción de recibir mis mensajes"
      );
    }
  },
};
