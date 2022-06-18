//Ordenando por ordem decrescente e pegando os amount primeiros valores
const getBestRepository = (repositories, amount = 4) => {
    return repositories
        .sort((first, second) => second.stargazers_count - first.stargazers_count)
        .slice(0, amount)
}

export const searchUsers = async (userName) => {
    const url = `http://api.github.com/users/${userName}`
    const dados = await fetch(url)
    if (dados.status == 404){
        throw new Error ("User not found") 
    }
    const user = await dados.json()
    
    
    const urlRepos = `http://api.github.com/users/${userName}/repos`
    const dadosRepos = await fetch(urlRepos)
    const repositories = await dadosRepos.json()
    const bestRepos = getBestRepository (repositories)

    return [user, bestRepos]
}