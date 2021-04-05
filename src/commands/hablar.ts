import { Client, Message } from "discord.js";
import { Command } from "../index";


// Respuestas moderadas = 0, todas las respuestas = 1

interface ChatBot {
  hablar(text:string, responseFilter: 0 | 1): Promise<string>
}

const chatbot:ChatBot = require("espchatbotapi")

export const command: Command = {
  name: "hablar",
  aliases: ["say"],
  category: 'chat',

  run: async (client: Client, message: Message, args: string[]) => {
    const text = args.join(" ");
    const response = await chatbot.hablar(text, 1)
    message.channel.send(response)  
  },
}

