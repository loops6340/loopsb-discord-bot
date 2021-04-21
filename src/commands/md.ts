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
   
    const argsParsed = yargs(args).options({
      user: { type: "string", alias: "u" },
      repeat: { type: "number", alias: "r", default: 1 },
      message: { type: "string", alias: "m" },
    }).argv;

    if (!argsParsed.user || !argsParsed.repeat || !argsParsed.message)
       return message.channel.send(
        code(`escribe correctamente el comando, se escribe:
        ${prefix}md 
        -u {id del usuario} 
        -r (opcional) {repeticiones del mensaje, por defecto 1} 
        -m {mensaje}`, 'py')
      );
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
        (await client.users.fetch(argsParsed.user)).send(argsParsed.message);
      }
      return message.channel.send(
        `Enviando MD's a ${
          (await client.users.fetch(argsParsed.user)).username
        } ${argsParsed.repeat} veces`
      );
    } catch {
      return message.channel.send(
        "parece que este usuario tiene bloqueada la opción de recibir mis mensajes"
      );
    }
  },
};
