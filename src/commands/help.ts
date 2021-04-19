import { Client, EmbedFieldData, Message, MessageEmbed } from "discord.js";
import { categories, Command } from "../index";
import path from "path";
import { code } from "../utils/embed-utils";
import fs from "fs/promises";
import { avatarAlts } from "../botconfig.json";
interface CommandData extends Omit<Command, "run"> {}

export const command: Command = {
  name: "help",
  aliases: ["ayuda"],
  category: "otros",

  run: async (client: Client, message: Message, args: string[]) => {
    const files = await fs.readdir(path.join(__dirname));

    const commands: CommandData[] = files
      .filter((file: string) => file.endsWith(".js"))
      .map((file) => {
        const command: Command = require(`./${file}`).command;
        const { name, category, hidden } = command;
        return { name, category, hidden };
      })
      .filter((cmd) => cmd.hidden != true);

    const fields: EmbedFieldData[] = categories.map((category) => {
      return {
        name: `${category}:`,
        value: code(commands
          .filter((cmd) => cmd.category === category)
          .map((cmd) => cmd.name).join(', ')),
      };
    });

    const embed = new MessageEmbed()
      .setTitle("Comandos:")
      .setColor(0xafeeee)
      .addFields(...fields)
      .setThumbnail(avatarAlts[0]);
    message.channel.send(embed);
  }
};
