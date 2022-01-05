document.addEventListener("DOMContentLoaded", function() {(
fetchBooks()

);

function fetchBooks() {
    const ul = document.getElementById("list")
    fetch("http://localhost:3000/books")
    .then(response => response.json())
    .then(response => {
        for (let book of response) {
            console.log(book)
            const li = document.createElement("li")
            li.textContent = book.title
            li.id = book.id

            li.addEventListener("click", e => bookDetails(e, book))
            
            ul.append(li)
            
    }})
}
function bookDetails(e, book){
    e.preventDefault()
    const showPanel = document.querySelector('#show-panel')
    const img = document.createElement("img")
    img.src = book.img_url
    img.alt = book.title
    const p = document.createElement('p')
    p.textContent = book.description
    const userUl = document.createElement("ul")
    book.users.forEach(user => {
        
        const userLi = document.createElement("li")
        userLi.textContent = user.username
        userUl.append(userLi)
    })
    

const button= document.createElement("button")
button.dataset.id = book.id
button.innerText ="like"
const user = randomUser()
button.addEventListener("click", (e) => addingLikesFromUsers(e, user, book))
showPanel.append(img, p, userUl, button)    
}

function addingLikesFromUsers(e, user, book) {
    e.preventDefault()
    let userList = []
    if(book.users.includes(user)) {
        userList = book.users.filter(bookUser => bookUser.id !== user.id)

    } else {
        userList = [...book.users, user]
       
       
       
    }
        fetch(`http://localhost:3000/books/${book.id}`),{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify
        }
        .then(response => response.json())
        .then(response => {
            console.log(response)
        
    })
}
function randomlyGetUser(){
    fetch("http://localhost:3000/users")
    .then(response => response.json())
    .then(response => {
        const numOfUsers = response.length
        function randomNumberGenerator() {

            const randomNumber = Math.floor(Math.random() * 10)
            if(randomNumber < numOfUsers)
            return response[randomNumber]
        } else {
            randomNumberGenerator()
        }
        }
    },
})
