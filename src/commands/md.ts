import { Client, Message } from "discord.js";
import { Command } from "../index";
import dashdash, { Option, OptionBase, OptionType } from 'dashdash';

export const command: Command = {
  name: "md",
  aliases: ["spam"],
  category: "chat",

  run: async (client: Client, message: Message, args: string[]) => {
    
    let options = [
      {
        group: '1 opt'
      },
      {
        names: ["user", 'u'],
        type: 'string'
      },
      {
        group: '2 opt'
      },
      {
        names:  ["text", 't'],
        type: 'string'
      }
    ]

    var opts = dashdash.parse({options: options});
    const parser = dashdash.createParser({options})
    console.log(opts)// es lo mismo, poner el {options} es simplificar {options:options} en javascript
    console.log(parser)
// argv son los args que le pasa desde la consola jsjs
//como se supone que funciona
// no sé, pero estoy viendo cómo pasar los args del mensaje a
    try {
       let opts = parser.parse(process.argv);
       console.log(process.argv)
       console.log(opts)
       console.log(opts._args)
       console.log(opts.user)
    } catch (e) {
      console.log(e)
      message.channel.send("Error")
      process.exit(1);
    }
    
  //   const user = (await client.users.fetch(argsParsed.user))
    
  //   if(!argsParsed.message || !argsParsed.repeat || !argsParsed.user) return message.channel.send("error");
  //   if (argsParsed.repeat > 50)
  //     return message.channel.send(
  //       "Escribiste un número demasiado grande (máximo 50)"
  //     );

  //   if (argsParsed.repeat < 0)
  //     return message.channel.send(
  //       "Escribiste un número negativo"
  //     );
  //   try {
  //     for (let i = 0; i < argsParsed.repeat; i++) {
  //       user.send(argsParsed.message);
  //     }
  //     return message.channel.send(
  //       `Enviando ${argsParsed.repeat} mensaje(s) ${user.username}`
  //     );
  //   } catch {
  //     return message.channel.send(
  //       "parece que este usuario tiene bloqueada la opción de recibir mensajes"
  //     );
  //   }
  // },
  }
};
