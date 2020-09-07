import { Message, Client, DiscordAPIError } from "discord.js"

export const eventMesssage = (
    client: Client,
    prefix: string,
    serviceGET: Function,
    Discord: any
) => {
    client.on('message', async (message: Message) => {
        if (message.content.startsWith(prefix + 'user ')) {
            const user: string = message.content.split(' ')[1]

            const profile = await serviceGET(
                'https://api.github.com/users/',
                user,
            )

            const repositories = await serviceGET(
                'https://api.github.com/users/',
                user,
                '/repos?per_page=6'
            )
            const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('GITHUB PROFILE')
                .setAuthor(profile.login, profile.avatar_url)
                .setImage(profile.avatar_url)

            for (let i = 0; i < repositories.length; i++) {
                embed.addFields(
                    { name: 'Repositorie', value: repositories[i].full_name }
                )
            }

            message.channel.send(embed);

        }
    })
}
