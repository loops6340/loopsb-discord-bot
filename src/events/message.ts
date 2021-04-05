import { Message } from "discord.js";

import config from '../botconfig.json';
import responses from './responses.json';
import { randomElement } from '../utils/others'
import { client, EventFunction } from "../index";

const prefix = config.prefix

export const event:EventFunction = {
  event: "message",

  once: false,

  async run(message:Message) {

    if (message.author.bot) return;

    const args: string[] = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);

    const command_name = args.shift().toLowerCase();

    /* Esta función sugnifica que si algún mensaje empieza con algún string del array
    este retorna verdadero o falso, lo uso para las comparaciones
    */

    function someMessageBeginsWith(array: string[]): boolean {
      return array.some((str) => message.content.toLowerCase().startsWith(str));
    }
    /* Lo mismo que el anterior, solo que aquí se refueriere a que si el contenido del 
    mensaje incluye algún string del array retorna verdadero o falso */

    function someMessageInclude(array: string[]): boolean {
      return array.some((str) => message.content.toLowerCase().includes(str));
    }

    //Comandos sin prefix

    if (message.mentions.has(client.user.id)) {
      message.channel.send(randomElement(responses.responsesToMentions));
    }

    /* 
      Ya que los posibles saludos que pordría dar un usuario son muchos, decidí ponerlos en un
      archivo json por separado.

      Tambien hice eso con las posibles respuestas que el bot le dará
    */

    if (someMessageBeginsWith(responses.regards.userRegards)) {
      if (someMessageInclude(message.guild.members.cache.map(user => user.nickname))) {
        message.channel.send(`Que tal!`) 
      } else {
        message.channel.send(randomElement(responses.regards.botRegards))
      }
    }

    /* Estos ya son comparadores que ya conocen, si algo
    empieza que este string, da esta respuesta
    */

    if (message.content.toLowerCase().startsWith("Hola bot como estás")) {
      message.channel.send(
        "Yo estoy muy bien, ¡Gracias por preocuparte!"
      );
    }

    if (message.content.toLowerCase().includes("server muerto")) {
      message.channel.send("¿Como que server muerto?");
    }

    /* comandos con prefix, en esta parte van los comandos, lo de abajo es el command 
    handler, invoca a los comandos que están en la carpeta commands de más arriba,
    al final de todo funciona igual que cuando escribimos el clasico if(command === 'algo')
    */

    if (!message.content.startsWith(prefix)) return
  
    const command =
      client.commands.get(command_name) ||
      client.commands.find(
        (cmd) =>
          cmd.aliases && cmd.aliases.includes(command_name)
      );

    if (!command) return;
    try {
      command.run(client, message, args);
    } catch (error) {
      throw new Error("Hubo un problema para cargar los comandos");
    }
  },
};
