import { Command } from "..";
import { randomElement } from '../utils/others'
export const command:Command = {
    name: 'random_user',
    category: 'otros',
    async run(client, message) {
        const users = message.guild.members.cache.map(member => member.user.tag)
        const selected_user = randomElement(users)
        message.channel.send(selected_user)
        //si funciona
        //sip
    }
} 