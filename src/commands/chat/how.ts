import { Client, Message, MessageEmbed } from "discord.js";
import { Command } from "../../index";

export const command: Command = {
 
  name: "how",
  aliases: ["soy"],

  async run(_client, message, args) {
    if (!args[0]) return message.channel.send("pon algo");

    let random = Math.round(Math.random() * 100);

    let emojis = ['💌', '🤨', '😮'];
    let r_emoji = emojis[Math.round(Math.random() * emojis.length)];
    const text = args.join(" ");
    const embed = new MessageEmbed()
      .setTitle(`${r_emoji} ${text} r8 machine`)
      .setDescription(`Tu eres ${random}% ${text}`)
      .setColor("RANDOM");

    return message.channel.send({ embed });
  },
};
