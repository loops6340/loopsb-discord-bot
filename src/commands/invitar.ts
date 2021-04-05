import { Client, Message, MessageEmbed } from "discord.js";
import { Command } from "../index";

export const command: Command = {
 
  name: "invitar",
  category: 'otros',

  run: async (client: Client, message: Message, args: string[]) => {
    const embed = new MessageEmbed()
      .setTitle("¡Invitame aquí!")
      .setColor(0xafeeee)
      .setURL(
        "https://discord.com/api/oauth2/authorize?client_id=553054344954511423&permissions=8&scope=bot"
      );
    message.channel.send(embed);
  },
};
