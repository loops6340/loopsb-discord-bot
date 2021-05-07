import path from "path";
import {
  Client as DefaultClient,
  ClientEvents,
  Collection,
  Message,
} from "discord.js";

import dotenv from "dotenv";

dotenv.config();

import fs from "fs/promises";

//Cambiar a las categorias que requiera su bot

export const categories = ["chat", "vc", "gd", "otros"] as const;

type Category = typeof categories[number];

export interface Command {
  name: string;
  aliases?: string[];
  category: Category;
  hidden?: boolean;
  run(
    client: Client,
    message: Message,
    args: string[]
  ): Promise<void> | void | Message | Promise<Message>;
}

export class Client extends DefaultClient {
  commands: Collection<string, Command> | undefined;
}

export const client = new Client();
client.commands = new Collection();

const commandFiles = async () => {
  const commands = await fs.readdir(path.join(__dirname, "./commands/"))
  return commands.filter((file: string) => file.endsWith(".js"));
}
const loadCommands = async () => {
  try {
    const files = await commandFiles()
    for (const file of files) {
    const command: Command = require(`./commands/${file}`).command;
    client.commands?.set(command.name, command);
    console.log(`${file} cargado`);
    }
  } catch (e) {
    throw new Error(e);
  }
}

loadCommands()

export interface EventFunction {
  event: keyof ClientEvents;
  disabled?: boolean;
  once: boolean;
  run(...args: ClientEvents[keyof ClientEvents]): Promise<void> | void;
}

const handleEvents = async () => {
  try {
    const eventsDir = path.join(__dirname, "./events/")
    const files: string[] = await fs.readdir(eventsDir);
    files
      .filter((file) => file.endsWith(".js"))
      .map((file) => {
        const { disabled, event, once, run }: EventFunction = require(`./events/${file}`).event;
        if (disabled) return;
        client[once ? "once" : "on"](event, (...args: ClientEvents[typeof event]) => run(...args));
      }); 
  } catch (error) {
    throw new Error(error);
  }
}

handleEvents()

client.login(process.env.TOKEN);
