import { Client, Message } from "discord.js";
import { Command } from "../index";
const { encode, decode } = require("morse-decoder");

export const command: Command = {
  
  name: "morse",
  aliases: ["morsetraducir"],
  type: 'others',

  run: async (client: Client, message: Message, args: string[]) => {

    interface opciones {
      funcionDeSalida: string;
      textoDeEntrada: string;
    }
    enum argsMorse {
      funcionDeSalida, //0
      textoDeEntrada, //1
    }
    function convertirMorse(interf: opciones) {
      switch (interf.funcionDeSalida) {
        case "-e":
          message.channel.send(encode(interf.textoDeEntrada));
          break;
        case "-d":
          message.channel.send(decode(interf.textoDeEntrada).toLowerCase()); //por alguna razon salia con mayúsculas asi que
          break;
        default:
          message.channel.send(
            "escribe bien el comando: f!morse {-e (encode) o -d (decode)} {texto}"
          );
          break;
      }
    }

    let entradaDiscord = {
      funcionDeSalida: args[argsMorse.funcionDeSalida],
      textoDeEntrada: args.slice(argsMorse.textoDeEntrada).join(" "),
    };

    convertirMorse(entradaDiscord);
  },
};
