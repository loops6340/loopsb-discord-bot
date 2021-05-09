import { Command } from "../..";
import { MessageAttachment } from "discord.js";
import { createCanvas, loadImage } from "canvas";
import { getLastAttachment } from "../../utils/attachments";

export const command: Command = {
  name: "jpeg",
  async run(_client, message, args) {

    if (!args[0] || !args[1])
      return message.channel.send("Debes proporcionar un ancho y una altura");

    const url = await getLastAttachment(message);

    const img = await loadImage(url);

    const canvas = createCanvas(parseInt(args[0]), parseInt(args[1]));

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
 
    canvas.toBuffer(async (err, buffer) => {
      if (err) {
        console.log(err);
      }
      const att = new MessageAttachment(buffer, "Jpeg-Procesado.png");
      message.channel.send(att);
    });
  },
};
