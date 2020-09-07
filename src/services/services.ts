import fetch from 'node-fetch'

export const serviceGET = async (
    URL: string, user: string,
    secondURL?: string | undefined
) => {

    if (secondURL === undefined) {
        const response = await fetch(`https://api.github.com/users/${user}`)
        return await response.json()
    }
    const response = await fetch(`https://api.github.com/users/${user}${secondURL}`)
    return await response.json()
}