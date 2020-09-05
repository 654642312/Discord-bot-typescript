import { config } from 'dotenv'

config()

import { Client, Message } from 'discord.js'
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
        message.channel.send(data.avatar_url);
        message.channel.send(data.login);
        for(let i = 0; i<repositories.length; i++){
            message.channel.send(repositories[i].full_name)
        }
    }
})

client.login(process.env.DISCORD_TOKEN)