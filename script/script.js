'use strict'
const search = document.getElementById("search")
const nameP = document.getElementById("name")
const username = document.getElementById("username")
const followers = document.getElementById("followers")
const amountRepositories = document.getElementById("repositories")
const image = document.getElementById("image")
const span = document.getElementById("span")
const star = document.getElementById("stars")


const userFormat = (user, stars) => {
    if (user.message == "Not Found"){
        span.innerText = "User not found"
        return 
    }
    
    span.innerText = ""
    nameP.innerText = `Name: ${user.name}`
    username.innerText = `UserName: ${user.login}`
    followers.innerText = `Followers: ${user.followers}`
    amountRepositories.innerText = `Repositories: ${user.public_repos}`
    image.innerHTML = `<img src = ${user.avatar_url} class = "image"/>`
    star.innerText = `Repositories with the most stars: ${stars.map((repository) => repository.name)}`
    
}

//Ordenando por ordem decrescente e pegando os amount primeiros valores
const getBestRepos = (repositories, amount = 4) => {
    return repositories
        .sort((first, second) => second.stargazers_count - first.stargazers_count)
        .slice(0, amount)
}

const searchUsers = async () => {
    const url = `http://api.github.com/users/${search.value}`
    const dados = await fetch(url)
    if (dados.status == 404){
        span.innerText = "User not found"
        return
    }
    const user = await dados.json()
    
    
    const urlRepos = `http://api.github.com/users/${search.value}/repos`
    const dadosRepos = await fetch(urlRepos)
    const repositories = await dadosRepos.json()

    
    const bestRepos = getBestRepos (repositories)
    userFormat(user, bestRepos)
}

document.addEventListener("keypress", (e) => {
    if (e.key === "Enter"){
        searchUsers()
    }
})

const header = document.getElementsByClassName("header")
const icon = document.getElementsByClassName("icon")
const title = document.getElementsByClassName("title")
const button = document.getElementById("button")
const body = document.body.classList.toggle("light-mode")

button.textContent = "Dark Mode"

const handleMode = () => {
    document.body.classList.toggle("light-mode")
    {button.textContent == "Dark Mode" ? button.textContent == "Light Mode": button.textContent == "Dark Mode"}
}
