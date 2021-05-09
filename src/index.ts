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

export const categories = ["chat", "vc", "gd", "otros", "imagenes"] as const;

type Category = typeof categories[number];

export interface Command {
  name: string;
  aliases?: string[];
  hidden?: boolean;
  run(client: Client,message: Message,args: string[]): Promise<void> | Promise<Message>;
}

export class Client extends DefaultClient {
  commands: Collection<string, Command> | undefined;
}

export const client = new Client();
client.commands = new Collection();

export const commandFiles = async () => {
  const dirs = await fs.readdir(path.join(__dirname, "./commands/"));
  const commands = Promise.all(dirs.map(async (dir) => {
    const category = dir
    const commands = await fs.readdir(path.join(__dirname, `./commands/${dir}`))
    return { category, commands }
  }))
  return await commands
};
const loadCommands = async () => {
  for (const files of await commandFiles()) {
    for (const file of files.commands) {
      const command: Command = require(`./commands/${files.category}/${file}`).command;
      client.commands?.set(command.name, command);
      console.log(`${file} cargado`);
    }
  }
};

loadCommands();

export interface EventFunction {
  event: keyof ClientEvents;
  disabled?: boolean;
  once: boolean;
  run(...args: ClientEvents[keyof ClientEvents]): Promise<void> | void;
}

const handleEvents = async () => {
  try {
    const eventsDir = path.join(__dirname, "./events/");
    const files: string[] = await fs.readdir(eventsDir)
    const events = files.filter((file) => file.endsWith(".js"));
    for (const eventFile of events) {
      const { disabled, event, once, run }: EventFunction = require(`./events/${eventFile}`).event;
      if (disabled) return;
      client[once ? "once" : "on"](event,(...args: ClientEvents[typeof event]) => run(...args));
    }
  } catch (error) {
    throw new Error(error);
  }
};

handleEvents();

client.login(process.env.TOKEN);
