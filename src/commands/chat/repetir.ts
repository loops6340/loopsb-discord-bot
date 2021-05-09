import { Command } from "../../index";

export const command: Command = {
  name: "repetir",

  async run(_client, message, args) {
    const text = args.join(" ");
    if (!text) return message.channel.send("escribí lo que voy a decir.")!;
    if(text.includes('@')) return message.channel.send('te crees gracioso mencionando?')!
    message.delete({ timeout: 0.1 });
    message.channel.send(text)!;
  },
};
