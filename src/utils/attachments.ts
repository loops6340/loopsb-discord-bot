import { Message } from "discord.js";

export async function getLastAttachment(message: Message) {
  try {
    const messages = await message.channel.messages.fetch({ limit: 100 });
    const messagesWithAttachments = messages.filter(
      (m) => m.attachments.array().length !== 0
    );
    const url = messagesWithAttachments.array()[0].attachments.array()[0].url;
    console.log(url);
    return url;
  } catch (error) {
    return "No se encontró alguna imagen";
  }
}
