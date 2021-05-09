import { Client, Message } from "discord.js";
import { Command } from "../../index";
const { encode, decode } = require("morse-decoder");

export const command: Command = {
  name: "morse",

  async run(_client, message, args) {
    const text = args.slice(1).join(' ')
    if(args[0] === "decode") {
      message.channel.send(decode(text).toLowerCase())
    } else if(args[0] === "encode") {
      message.channel.send(encode(text))
    } else {
      message.channel.send('Escribe una opción válida: decode | encode')
    }
  }
};
