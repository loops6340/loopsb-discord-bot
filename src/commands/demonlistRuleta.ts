import { getDemonByTop } from "../apis/demonlist/demonlist";
import {
  Client,
  CollectorFilter,
  Message,
  MessageEmbed,
  MessageReaction,
  User,
} from "discord.js";
import { Command } from "../index";

export const command: Command = {
  name: "ruleta",
  aliases: ["ruletademon", "ruletademongd"],
  category: "gd",

  run: async (client: Client, message: Message, args: string[]) => {
    
    async function newDemon() {
      
      try {
        
        let random = Math.round(Math.random() * 200);

        const demon = await getDemonByTop(random)

        const creators = demon.creators.map((creator) => creator.name).join(", ");

        const videoId = demon.video.slice(-11);

        const videoThumbnail = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`

        const embed = new MessageEmbed()
          .setTitle(`# ${demon.position} - ${demon.name}`)
          .setDescription(`Por: ${creators} [link del video](${demon.video})`)
          .setImage(videoThumbnail)
          .setColor("RANDOM")
          .setFooter(`Verificado por ${demon.verifier.name}`);
        
        return embed;

      } catch {

        return 'Hubo un error, intenta hacer esto de nuevo'

      }
    }
    
    const receivedMessage = await message.channel.send(await newDemon());

    receivedMessage.react("➡️").then(() => receivedMessage.react("🛑"));

    const filter: CollectorFilter = (reaction: MessageReaction, user: User) => {
      return (
        ["➡️", "🛑"].includes(reaction.emoji.name) &&
        user.id === message.author.id
      );
    };

    let collector = receivedMessage.createReactionCollector(filter, {
      idle: 1200000,
    });

    collector.on("collect", async (reaction, user) => {

      if (reaction.emoji.name === "➡️") {
        await reaction.users.remove(user.id);
        await receivedMessage.edit(await newDemon());
      }
      if (reaction.emoji.name === "🛑") {
        collector.stop();
      }
    });

    collector.on("end", () => {
      message.reactions.removeAll()
      message.channel.send('lo siendo, se te ha acabado el tiempo')
    });
  },
};
