import { config } from 'dotenv'

config()

import Discord, { Client } from 'discord.js'
import { prefix } from './config.json'
import { serviceGET } from './services/services'
import { eventMesssage } from './events/message'

const client: Client = new Client()

client.on('ready', (): void => {
    console.log('bot Is READY')
})

eventMesssage(client, prefix, serviceGET, Discord)


client.login(process.env.DISCORD_TOKEN)