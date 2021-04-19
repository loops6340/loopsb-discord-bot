import { Client, Message, MessageEmbed } from "discord.js";
import { Command } from "../index";
import { getDemonByName, getDemonByTop } from "../apis/demonlist/demonlist.js";
import { DemonResultsByName, DemonResultsByPosition } from "../apis/demonlist";

export const command: Command = {
  name: "demonlist",
  category: "gd",

  run: async (client: Client, message: Message, args: string[]) => {
    let entrada: string = args.join(" ");
    let getDemon:typeof getDemonByTop | typeof getDemonByName

    if (parseInt(entrada)) {
      getDemon = getDemonByTop;
    } else {
      getDemon = getDemonByName;
    }

    try {
      const demon = await getDemon(entrada);

      const creators = demon.creators.map((creator) => creator.name).join(", ");
      const videoId = demon.video.slice(-11); //id del video

      const embedDemon = new MessageEmbed()
        .setTitle(`# ${demon.position} - ${demon.name}`)
        .setDescription(`Por: ${creators} [link del video](${demon.video})`)
        .setImage(`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`)
        .setColor("RANDOM")
        .setFooter(`Verificado por ${demon.verifier.name}`);

      message.channel.send(embedDemon);
    } catch {
      message.channel.send("no se encontró el demon");
    }
  },
};
