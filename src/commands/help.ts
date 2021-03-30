import { Client, EmbedFieldData, Message, MessageEmbed } from "discord.js";
import { Command } from "../index";
import fs from "fs";
import path from "path";
import { code } from "../utils/embed-utils";

export const command: Command = {
  name: "help",
  aliases: ["ayuda"],
  type: "others",

  run: async (client: Client, message: Message, args: string[]) => {
    interface CommandData {
      name: string;
      type: Command["type"];
      hidden: boolean;
    }

    let commands: CommandData[];

    fs.readdir(path.join(__dirname), (err, files: string[]) => {
      if (err) return console.error(err);

      commands = files
        .filter((file: string) => file.endsWith(".js"))
        .map((file) => {
          const command: Command = require(`./${file}`).command;

          return {
            name: command.name,
            type: command.type,
            hidden: command.hidden,
          };
        })
        .filter((e) => e.hidden != true);

      function findCommandsByType(type: CommandData["type"]) {
        return commands.filter((cmd) => cmd.type === type).map((e) => e.name).join(", ");
      }

      const fields: EmbedFieldData[] = [
        { name: "Chat:", value: code(findCommandsByType("chat")) },
        { name: "Vc:", value: code(findCommandsByType("vc")) },
        { name: "Gd:", value: code(findCommandsByType("gd")) },
        { name: "Otros:", value: code(findCommandsByType("others")) },
      ];

      const embed = new MessageEmbed()
        .setTitle("Comandos:")
        .setColor(0xafeeee)
        .addFields(...fields)
        .setThumbnail("https://cdn.discordapp.com/emojis/603790378746904580.png?v=1");
      message.channel.send({ embed });
    });
  },
};
