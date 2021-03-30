import { Client, Message } from "discord.js";
import { Command } from "../index";
import path from "path";

export const command: Command = {
  
  name: "sans",
  type: 'vc',

  run: async (client: Client, message: Message, args: string[]) => {
  
    const duración = args[0];

    async function play(file: string) {
      if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join();
        connection.play(path.join(__dirname, `../../audio/${file}`));
      }
    }

    switch (duración) {
      case "-ss":
        play("sans_super_small.mp3");
        break;
      case "-s":
        play("sans_small.mp3");
        break;
      case "-m":
        play("sans_medium.mp3");
      case "-l":
        play("sans_long.mp3");
        break;
      default:
        message.channel.send("opción incorrectá! [ -ss, -s, -m, -l ]");
        break;
    }
  },
};
