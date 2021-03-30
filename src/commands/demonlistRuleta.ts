import { getDemonByTop } from "../apis/demonlist/demonlist";
import { Client, Message, MessageEmbed } from "discord.js";
import { Command } from "../index";

export const command: Command = {
  name: "ruleta",
  aliases: ["ruletademon", "ruletademongd"],
  type: 'gd',

  run: async (client: Client, message: Message, args: string[]) => {
    let random = Math.round(Math.random() * 200);

    getDemonByTop(random).then((demon) => {
      const creadores = demon.creators.map((creator) => creator.name).join(", ");
      const videoId = demon.video.slice(-11);

      const embedDemon = new MessageEmbed()
        .setTitle(`# ${demon.position} - ${demon.name}`)
        .setDescription(`Por: ${creadores} [link del video](${demon.video})`)
        .setImage(`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`)
        .setColor("RANDOM")
        .setFooter(`Verificado por ${demon.verifier.name}`);
      message.channel.send(embedDemon);
    });
  },
};
