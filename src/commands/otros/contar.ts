import { Client, Message } from "discord.js";
import { Command } from "../../index";
import { sleep } from "../../utils/others";

export const command:Command = {
  name: "contar",
  aliases: ["cuenta"],

  async run(_client, message, args) {
    enum valor {
      valorInicial,
      valorFinal,
    }
    let valor1: number = parseInt(args[valor.valorInicial]);
    let valor2: number = parseInt(args[valor.valorFinal]);


    if (!valor1) return message.channel.send(`pon la cantidad`);
    
    if (valor2 - valor1 > 50) return message.channel.send("no puedo contar tanto, me podría colapsar");
      
    for (let num = valor1; num <= valor2; num++) {
        message.channel.send(num);
        await sleep(2500);
      }
    }

};
