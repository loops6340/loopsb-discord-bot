import { Command } from "../..";
import { MessageAttachment } from "discord.js";
import { createCanvas, loadImage } from "canvas";
import { getLastAttachment } from "../../utils/attachments";

export const command: Command = {
  name: "jpeg2",
  
  async run(_client, message) {

    const url = await getLastAttachment(message);

    const img = await loadImage(url);

    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    canvas.toBuffer(async (err, buffer) => {
        if (err) {
          console.log(err);
        }
        const att = new MessageAttachment(buffer, "Jpeg2-Procesado.jpeg");
        message.channel.send(att);
      },
      "image/jpeg",
      { quality: 0.5 }
    );
  },
};
