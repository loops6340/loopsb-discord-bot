import { Client, Message, MessageEmbed } from "discord.js";
import { Command } from "../index";
import { getDemonByName, getDemonByTop } from "../apis/demonlist/demonlist.js";

export const command: Command = {
  name: "demonlist",
  type: 'gd',

  run: async (client: Client, message: Message, args: string[]) => {
    let entrada: string = args.join(" ");
    let getDemon;

    if (parseInt(entrada)) {
      getDemon = getDemonByTop;
    } else {
      getDemon = getDemonByName;
    }

    getDemon(entrada).then((res) => {
        const creators = res.creators.map((creator) => creator.name).join(", ");
        const videoId = res.video.slice(-11); //id del video

        const embedDemon = new MessageEmbed()
          .setTitle(`# ${res.position} - ${res.name}`)
          .setDescription(`Por: ${creators} [link del video](${res.video})`)
          .setImage(`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`)
          .setColor("RANDOM")
          .setFooter(`Verificado por ${res.verifier.name}`);

        message.channel.send(embedDemon);
      })
      .catch(() => message.channel.send("no se encontró el demon"));
  },
};
