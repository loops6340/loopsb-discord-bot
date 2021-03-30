import axios from "axios";
import { Client, Message, MessageAttachment } from "discord.js";
import { Command } from "../index";

export const command: Command = {
  
  name: "gdlogo",
  aliases: ["gdcolon", "gdjuniper", "gdloops"],
  type: 'gd',

  run: async (client: Client, message: Message, args: string[]) => {
    if (!args[0]) return message.channel.send("No pusiste nada :c");

    let texto = args.join("%20");

    /* Esto lo pongo porque la imagen demora aalgo de tiempo en crearse */

    async function createImage(logoName: string) {
      const loadImage = await axios.get(
        `https://gdcolon.com/tools/gdlogo/img/${logoName}`
      );
      return loadImage;
    }

    createImage(texto).then(() => {
      const attachment = new MessageAttachment(
        `https://gdcolon.com/tools/gdlogo/img/${texto}`,
        "logo.png"
      );
      message.channel.send(attachment);
    });
  },
};
