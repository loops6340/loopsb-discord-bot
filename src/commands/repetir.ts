import { Client, Message } from "discord.js";
import { Command } from "../index";

export const command: Command = {
  name: "repetir",
  type: 'chat',

  run: async (client: Client, message: Message, args: string[]) => {
    let texto = args.join(" ");
    if(texto.includes('@')) return message.channel.send('te crees gracioso mencionando?')
    if (!texto) return message.channel.send("escribí lo que voy a decir.");
    message.delete({ timeout: 0.1 });
    message.channel.send(texto);
  },
};
