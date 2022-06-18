import { searchUsers } from "./searchUsers.js"
const search = document.getElementById("search")
const nameP = document.getElementById("name")
const username = document.getElementById("username")
const followers = document.getElementById("followers")
const amountRepositories = document.getElementById("repositories")
const image = document.getElementById("image")
const span = document.getElementById("span")
const star = document.getElementById("stars")


const userFormat = async () => {
    try {
        const [user, bestRepos] = await searchUsers(search.value)

        span.innerText = ""
        nameP.innerText = `Name: ${user.name}`
        username.innerText = `UserName: ${user.login}`
        followers.innerText = `Followers: ${user.followers}`
        amountRepositories.innerText = `Repositories: ${user.public_repos}`
        image.innerHTML = `<img src = ${user.avatar_url} class = "image"/>`
        star.innerText = `Repositories with the most stars: ${bestRepos.map((repository) => repository.name)}`
    } catch (e) {
        resetUI ()
        span.innerText = e.message
    }
}
window.userFormat = userFormat

const resetUI = () => {
    span.innerText = ""
    nameP.innerText = ""
    username.innerText = ""
    followers.innerText =""
    amountRepositories.innerText =""
    image.innerHTML = ""
    star.innerText = ""
}

document.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        userFormat()
    }
})