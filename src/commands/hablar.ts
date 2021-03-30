import { Client, Message } from "discord.js";
import { Command } from "../index";
const chatbot = require("espchatbotapi");

export const command: Command = {
  name: "hablar",
  aliases: ["say"],
  type: 'chat',

  run: async (client: Client, message: Message, args: string[]) => {
    const texto = args.join(" ");
    chatbot.hablar(texto, 1).then((respuesta: string) => {
      message.channel.send(respuesta);
    });
  },
};
