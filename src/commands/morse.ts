import { Client, Message } from "discord.js";
import { Command } from "../index";
const { encode, decode } = require("morse-decoder");
import { prefix } from "../botconfig.json";
import yargs from "yargs";
import { code } from "../utils/embed-utils";

export const command: Command = {
  name: "morse",
  aliases: ["morsetraducir"],
  category: "otros",

  run: async (client: Client, message: Message, args: string[]) => {
    const parsedArgs = yargs(args).options({
      e: { type: "string", alias: 'encode' },
      d: { type: "string", alias: 'decode' },
    }).argv

    if (parsedArgs.e) {
      const encodedText = encode(parsedArgs.e);
      message.channel.send(encodedText);
    } else if (parsedArgs.d) {
      const decodedText = decode(parsedArgs.d);
      message.channel.send(decodedText);
    } else {
      message.channel.send(
        `escribe bien el comando: ${prefix}morse -e (encode) o -d (decode) {texto}`
      );
    }
  },
};
