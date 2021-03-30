import { Client, Message, MessageEmbed } from "discord.js";
import { Command } from "../index";

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
  type: 'chat',
  
  run: async (client:Client, message:Message, args:string[]) => {
    let texto = args.join(" ");
   
    var random = respuesta[Math.floor(Math.random() * respuesta.length)];
    const embed = new MessageEmbed()
      .setThumbnail(client.user.avatarURL())
      .addField("A su pregunta", `${texto}`)
      .addField("Mi respuesta", `${random}`)
      .setColor("RANDOM");
    message.channel.send(embed);
  }

}
