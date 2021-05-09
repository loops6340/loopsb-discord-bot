import { MessageAttachment } from "discord.js";
import { Command } from "../../index";

export const command: Command = {
  name: "ss",

  async run(_client, message, args) {
    if (!args[0]) return message.channel.send("escribe una url");
    function screenshot(url: string) {
      return new MessageAttachment(
        `http://api.screenshotlayer.com/api/capture?access_key=74d03ed8e6435591e4e0876f85afa1f6&url=${url}&viewport=1280x720`
      ).setName("screenshot.png");
    }
    message.channel.send(screenshot(args[0]));
  },
}; //jsjs este comando es muy antiguo, no se si borrarlo
