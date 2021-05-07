import { Client, Message, MessageEmbed } from "discord.js";
import { Command } from "../index";

export const command: Command = {
 
  name: "how",
  aliases: ["soy"],
  category: 'chat',

  run: async (client: Client, message: Message, args: string[]) => {
    if (!args[0]) return message.channel.send("pon algo");

    let random = Math.round(Math.random() * 100);

    var emojis = ['🐹', '💌', '🤨', '💦', '😮', '😏'];
    var r_emoji = emojis[Math.round(Math.random() * emojis.length)];
    const text = args.join(" ");
    const embed = new MessageEmbed()
      .setTitle(`${r_emoji} ${text} r8 machine`)
      .setDescription(`Tu eres ${random}% ${text}`)
      .setColor("RANDOM");

    return message.channel.send({ embed });
  },
};
