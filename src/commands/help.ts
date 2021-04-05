import { Client, EmbedFieldData, Message, MessageEmbed } from "discord.js";
import { categories, Command } from "../index";
import fs from "fs";
import path from "path";
import { code } from "../utils/embed-utils";

interface CommandData extends Omit<Command, 'run'> {}

export const command: Command = {
  name: "help",
  aliases: ["ayuda"],
  category: "otros",

  run: async (client: Client, message: Message, args: string[]) => {
    let commands: CommandData[];

    fs.readdir(path.join(__dirname), (err, files: string[]) => {
      if (err) return console.error(err);

      commands = files
        .filter((file: string) => file.endsWith(".js"))
        .map((file) => {
          const command: Command = require(`./${file}`).command;
          const { name, category, hidden } = command
          return { name, category, hidden }
        })
        .filter((cmd) => cmd.hidden != true);

      function findCommandsByCategory(category: CommandData['category']) {
        return commands.filter((cmd) => cmd.category === category).map((cmd) => cmd.name).join(", ");
      }
    
      const fields:EmbedFieldData[] = categories.map(category => {
        return { name: `${category}:`, value: code(findCommandsByCategory(category)) }
      })

      const embed = new MessageEmbed()
        .setTitle("Comandos:")
        .setColor(0xafeeee)
        .addFields(...fields)
        .setThumbnail("https://cdn.discordapp.com/emojis/603790378746904580.png?v=1");
      message.channel.send({ embed });
    });
  },
}



