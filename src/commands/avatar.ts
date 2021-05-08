import {
  AllowedImageFormat,
  Client,
  Message,
  MessageEmbed,
  User,
} from "discord.js";
import { Command } from "../index";
import { Embed } from "../utils/embed-utils";

export const command: Command = {
  name: "avatar",
  aliases: ["pfp"],
  category: 'chat',

  run: async (client: Client, message: Message, args: string[]) => {
    let user: User;
    let format: string;

    if (!args[0]) user = message.author;
    else {
      user =  message.mentions.users.first() ||
      client.users.cache.find((user) =>
         user.username.toLocaleLowerCase().includes(args[0].toLocaleLowerCase())
      )
      || await client.users.fetch(args[0]);
    }

    const avatarLinkInEmbed = (format: AllowedImageFormat) => {
      
      const avatarURL = user.displayAvatarURL({
        format: format,
        size: 1024,
      });
      
      return Embed.link(format, avatarURL);
    }
     

    if (user.displayAvatarURL({ dynamic: true }).includes(".gif")) {
      format = avatarLinkInEmbed("gif");
    } else {
      const formats = ['png', 'jpg', 'webp', 'jpeg']
      format = formats.map((format) => avatarLinkInEmbed(format as AllowedImageFormat)).join(' | ')
    }

    const embed = new MessageEmbed()
      .setAuthor(`${user.tag}'s avatar`, user.displayAvatarURL())
      .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setDescription(format)
      .setColor(0xafeeee);
    message.channel.send({ embed });
  },
};
