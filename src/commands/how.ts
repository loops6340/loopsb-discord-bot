import { Client, Message, MessageEmbed } from "discord.js";
import { Command } from "../index";

export const command: Command = {
 
  name: "how",
  aliases: ["soy"],
  category: 'chat',

  run: async (client: Client, message: Message, args: string[]) => {
    if (!args[0]) return message.channel.send("pon algo");

    const text = args.join(" ");
    const embed = new MessageEmbed()
      .setTitle(`${text} r8 machine`)
      .setDescription(`Tu eres ${Math.round(Math.random() * 100)}% ${text}`)
      .setColor("RANDOM");

    return message.channel.send({ embed });
  },
};
