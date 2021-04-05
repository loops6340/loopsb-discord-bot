import axios from "axios";
import { Client, Message, MessageAttachment } from "discord.js";
import { Command } from "../index";

export const command: Command = {
  
  name: "gdlogo",
  aliases: ["gdcolon", "gdjuniper", "gdloops"],
  category: 'gd',

  run: async (client: Client, message: Message, args: string[]) => {
    
    if (!args[0]) return message.channel.send("No pusiste nada :c");

    const text = args.join("%20");

    /* Esto lo pongo porque la imagen demora algo de tiempo en crearse */

    const loadImage = await axios.get(
      `https://gdcolon.com/tools/gdlogo/img/${text}`
    );
    
    const attachment = new MessageAttachment(
      `https://gdcolon.com/tools/gdlogo/img/${text}`,
      "logo.png"
    );
    
    message.channel.send(attachment);

  },
};
