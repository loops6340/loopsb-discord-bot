import { Message, MessageEmbed, TextChannel } from "discord.js";

import { EventFunction } from '..'
import { Embed } from "../utils/embed-utils";

export const event:EventFunction = {

  event: "messageDelete",

  once: false,

  run(message: Message) {
   
    const irrelevantContent = ["", "n", "ok, processing"];
    
    if (irrelevantContent.some((word) => word === message.content))
      return;

    if (message.channel.type === "text") {
     
      const desc = `https://discord.com/channels/${message.guild?.id}/${message.channel.id}/`;
   
      const delEmbed = new MessageEmbed()
        .setDescription(`${Embed.link('Ir al canal', desc)}\n${message.content}`)
        .setColor(0xafeeee)
        .setAuthor(message.author.username, message.author.avatarURL()!)
        .setFooter(`${message.guild?.name} | #${message.channel.name}`);

      const logsChannel = message.guild?.channels.cache.find(channel => channel.name.includes('logs'));

      if(logsChannel !== undefined) {
        (<TextChannel>logsChannel).send(delEmbed);
      } else {
        return console.log('canal no encontrado')
      }
      //tambien pueden cambiarlo por:
      /* 
      algún canal de algún server donde se guarden todos los logs de todos los mensajes de todos los servers
      const logsChannel = client.channels.cache.get(process.env.LOGSCHANNEL); 
      if (logsChannel == undefined)
      return;      
      (logsChannel as TextChannel).send(delEmbed);
      */

      
     
    }
  }

};
