import {
  AllowedImageFormat,
  Client,
  Message,
  MessageEmbed,
  User,
} from "discord.js";
import { Command } from "../index";

export const command: Command = {
  name: "avatar",
  aliases: ["pfp"],
  type: 'chat',

  run: async (client: Client, message: Message, args: string[]) => {
    let user: User;
    let format: string;

    if (!args[0]) user = message.author;
    else {
      const mention = message.mentions.users.first();
      const name = client.users.cache.find((user) =>
        user.username.toLocaleLowerCase().includes(args[0])
      );
      const id = await client.users.fetch(args[0]);
      user = mention || name || id;
    }

    const avatarLinkInEmbed = (format: AllowedImageFormat) => {
      
      const avatarURL = user.displayAvatarURL({
        format: format,
        size: 1024,
      });
      
      return `[${format}](${avatarURL})`;
    }
     

    if (user.displayAvatarURL({ dynamic: true }).includes(".gif")) {
      format = avatarLinkInEmbed("gif");
    } else {

      const png = avatarLinkInEmbed("png")
      const jpg = avatarLinkInEmbed("jpg")
      const webp = avatarLinkInEmbed("webp")
      const jpeg = avatarLinkInEmbed("jpeg")
      format = `${png} | ${jpg} | ${webp} | ${jpeg}`;
    }

    const embed = new MessageEmbed()
      .setAuthor(`${user.tag}'s avatar`, user.displayAvatarURL())
      .setDescription(format)
      .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setColor(0xafeeee);

    message.channel.send({ embed });
  },
};
