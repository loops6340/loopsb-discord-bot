import path from "path";
import { Client as DefaultClient, ClientEvents, Collection, Message } from "discord.js";

import dotenv from 'dotenv';

dotenv.config()

import fs from "fs";


export interface Command {
  
  name: string;
  aliases?: string[];
  type: 'gd' | 'developer' | 'chat' | 'vc' | 'others';
  hidden?: boolean;
  run(client: Client, message: Message, args: string[]): Promise<void> | void | Message | Promise<Message>
}

export class Client extends DefaultClient {
  commands: Collection<string, Command>;
}

export const client: Client = new Client();

client.commands = new Collection();

const commandFiles = fs
  .readdirSync(path.join(__dirname, "./commands/"))
  .filter((file: string) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command:Command = require(`./commands/${file}`).command;
  client.commands.set(command.name, command);
  console.log(`${file} cargado`);
}

export interface EventFunction {
  event: keyof ClientEvents;
  disabled?: boolean;
  once: boolean,
  run(...args: ClientEvents[keyof ClientEvents]): Promise<void> | void
}

fs.readdir(path.join(__dirname, "./events/"), (err, files: string[]) => {
  if (err) return console.error(err);
  files
    .filter((file: string) => file.endsWith(".js"))
    .forEach((file) => {
      const eventFunction:EventFunction = require(`./events/${file}`).event;
      
      if (eventFunction.disabled) return;

      const event = eventFunction.event;
      const emitter = client;
      const once = eventFunction.once;
    
      try {
        emitter[once ? "once" : "on"]<typeof event>(event, (...args: ClientEvents[typeof event]) =>
          eventFunction.run(...args)
        );
      } catch (error) {
        console.error(error.stack);
      } 
    }); 
});

client.login(process.env.TOKEN);
