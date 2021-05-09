import { Command } from "../..";
import { randomElement } from '../../utils/others'
export const command:Command = {
    name: 'random_user',
    async run(_client, message) {
        const users = message.guild.members.cache.map(member => member.user.tag)
        const selected_user = randomElement(users)
        message.channel.send(selected_user)
    }
} 