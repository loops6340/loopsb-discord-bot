import { Client, Message, MessageEmbed } from "discord.js";
import { Command } from "../../index";

export const command: Command = {
 
  name: "invitar",

  async run(_client, message) {
    const URL = "https://discord.com/api/oauth2/authorize?client_id=553054344954511423&permissions=8&scope=bot"
    const embed = new MessageEmbed()
      .setTitle("¡Invitame aquí!")
      .setColor(0xafeeee)
      .setURL(URL);
    message.channel.send(embed);
  },
};
