import { Message } from "discord.js";

import config from '../botconfig.json';
import comparators from "./message-arrays/comparators";
import randomAnswers from "./message-arrays/random-answers"
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
      message.channel.send(randomElement(randomAnswers.mentionsResponses));
    }

    /* ejemplo: args = ["hola", "loops"], bueno aquí agarramos el [1] que es loops,
    en los arrays empezamos desde el 0 */

    if (someMessageBeginsWith(comparators.userRegards)) {
      if (someMessageInclude(message.guild.members.cache.map(user => user.displayName))) {
        message.channel.send(`Que tal!`) 
      } else {
        message.channel.send(randomElement(randomAnswers.botRegards))
      }
    }

    /* Estos ya son comparadores normales de toda la vida que ya conocen, si algo
    empieza que este string, da esta respuesta, por cierto, esto tiene que ver
    con el server que ya les mencioné en el readme
    */

    if (message.content.toLowerCase().startsWith("co2")) {
      message.channel.send(
        "un grande co2, el mejor usuario de la historia del ytph"
      );
    }

    if (message.content.toLowerCase().includes("marisa")) {
      message.channel.send("marisa");
    }

    /* comandos con prefix, en esta parte van los comandos, lo de abajo es el command 
    handler, invoca a los comandos que están en la carpeta commands de más arriba,
    al final de todo funciona igual que cuando escribimos el clasico if(command === 'algo')
    */

    if (!message.content.startsWith(prefix)) return;


  
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
      console.error(error);
      message.channel.send("el mejor bot de todos ha tenido un error. f");
    }
  },
};
