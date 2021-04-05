import { Client, Message } from "discord.js";
import { Command } from "../index";

export const command:Command = {
  name: "contar",
  aliases: ["cuenta"],
  category: 'otros',

  run: async (client: Client, message: Message, args: string[]) => {
    enum valor {
      valorInicial,
      valorFinal,
    }
    let valor1: number = parseInt(args[valor.valorInicial]);
    let valor2: number = parseInt(args[valor.valorFinal]);

    function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    if (!valor1) return message.channel.send(`pon la cantidad`);
    
    if (valor2 - valor1 > 50) return message.channel.send("no puedo contar tanto, me podría colapsar");
      
    for (let num = valor1; num <= valor2; num++) {
        message.channel.send(num);
        await sleep(2500);
      }
    }

};
