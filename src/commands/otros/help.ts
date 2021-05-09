import { EmbedFieldData, MessageEmbed } from "discord.js";
import { Command, commandFiles } from "../../index";
import { code } from "../../utils/embed-utils";
import { avatarAlts } from "../../botconfig.json";

export const command: Command = {
  name: "help",
  aliases: ["ayuda"],

  async run(_client, message) {

    const files = await commandFiles();

    const fields: EmbedFieldData[] = files.map((file) => {
      const commands: Command[] = file.commands.map(
        (cmd) => require(`../${file.category}/${cmd}`).command
      );
      return {
        name: `${file.category}:`,
        value: code(commands.map((command) => command.name).join(", ")),
      };
    });

    const embed = new MessageEmbed()
      .setTitle("Comandos:")
      .setColor(0xafeeee)
      .addFields(...fields)
      .setThumbnail(avatarAlts[0]);
    message.channel.send(embed);
  },
};
