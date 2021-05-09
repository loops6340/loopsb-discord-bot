import { getDemonByName, getDemonByPosition } from "demonlist";
import { Client, Message, MessageEmbed } from "discord.js";
import { Command } from "../../index";
import { Embed } from "../../utils/embed-utils";

export const command: Command = {
  name: "demonlist",

  async run(_client, message, args) {
    
    let entrada = args.join(" ");
    let demon;

    if (parseInt(entrada)) {
      demon = await getDemonByPosition(parseInt(entrada));
    } else {
      demon = await getDemonByName(entrada);
    }

    try {
 
      const creators = demon.creators.map((creator) => creator.name).join(", ");
      const videoId = demon.video.slice(-11); //id del video

      const embedDemon = new MessageEmbed()
        .setTitle(`# ${demon.position} - ${demon.name}`)
        .setDescription(`Por: ${creators} ${Embed.link('link del video', demon.video)}`)
        .setImage(`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`)
        .setColor("RANDOM")
        .setFooter(`Verificado por ${demon.verifier.name}`);

      message.channel.send(embedDemon);
    } catch {
      message.channel.send("no se encontró el demon");
    }
  },
};
