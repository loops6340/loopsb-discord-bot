import { Client, Message } from "discord.js";
import { Command } from "../index";
const { encode, decode } = require("morse-decoder");
import { prefix } from "../botconfig.json";

export const command: Command = {
  
  name: "morse",
  aliases: ["morsetraducir"],
  category: 'otros',

  run: async (client: Client, message: Message, args: string[]) => {

    interface MorseCommand{
      option: string;
      arguments: string;
    }
    
    function convert(morse:MorseCommand) {
      switch (morse.option) {
        case "-e":
          const encodedText = encode(morse.arguments)
          message.channel.send(encodedText);
          break;
        case "-d":
          const decodedText = decode(morse.arguments).toLowerCase()
          message.channel.send(decodedText); //por alguna razon salia con mayúsculas asi que
          break;
        default:
          message.channel.send(
            `escribe bien el comando: ${prefix}morse -e (encode) o -d (decode) {texto}`
          );
          break;
      }
    }

    let entry:MorseCommand = {
      option: args[0],
      arguments: args.slice(1).join(" "),
    };

    convert(entry);
  },
};
