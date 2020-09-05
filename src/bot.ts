import { config } from 'dotenv'

config()

import Discord, { Client, Message } from 'discord.js'
import { prefix } from './config.json'
import fetch from 'node-fetch'

const client: Client = new Client()

client.on('ready', (): void => {
    console.log('bot Is READY')
})

client.on('message', async (message: Message) => {
    if(message.content.startsWith(prefix + 'user ')){
        const user: string = message.content.split(' ')[1]
        const response = await fetch('https://api.github.com/users/' + user)
        const data = await response.json()
        const secondResponse = await fetch('https://api.github.com/users/' + user + '/repos?per_page=6')
        const repositories = await secondResponse.json();

        const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('GITHUB PROFILE')
        .setAuthor(data.login, data.avatar_url)
        .setImage(data.avatar_url)

        for(let i = 0; i<repositories.length; i++){
            embed.addFields(
                {name: 'Repositorie', value: repositories[i].full_name}
            )
        }

        message.channel.send(embed);
        
    }
})

client.login(process.env.DISCORD_TOKEN)