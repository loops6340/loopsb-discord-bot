import { Client, Message, MessageEmbed } from "discord.js";
import { Command } from "../index";

export const command: Command = {
 
  name: "how",
  aliases: ["soy"],
  type: 'chat',

  run: async (client: Client, message: Message, args: string[]) => {
    if (!args[0]) return message.channel.send("pon algo");

    let texto = args.join(" ");
    const embed = new MessageEmbed()
      .setTitle(`${texto} r8 machine`)
      .setDescription(`Tu eres ${Math.round(Math.random() * 100)}% ${texto}`)
      .setColor("RANDOM");

    return message.channel.send({ embed });
  },
};
