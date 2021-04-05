import { Client, Message, MessageEmbed } from "discord.js";
import { Command } from "../index";
import { randomElement } from "../utils/others";

const respuesta = [
  "noOOOOOOOOOOOOOOO",
  "no",
  "me hiciste cagar de risa con esa pregunta",
  "¿QUE COSA? *se decepciona*",
  "no lo se",
  "Quizás en un año más.",
  "obviamente si",
  "no se si me estás boludeando o que con esa pregunta",
  "si y que",
  "ok",
  "loops owner",
  "xf",
  "retame a ver quien usa el minimo como multiplo po qliao",
  "cámara de diputados",

];

export const command:Command = {

  name: "8ball",
  aliases: ["bola8"],
  category: 'chat',
  
  run: async (client:Client, message:Message, args:string[]) => {
    const text = args.join(" ");
   
    let random = randomElement(respuesta)
    
    const embed = new MessageEmbed()
      .setThumbnail(client.user.avatarURL())
      .addField("A su pregunta", `${text}`)
      .addField("Mi respuesta", `${random}`)
      .setColor("RANDOM");
    message.channel.send(embed);
  }

}
