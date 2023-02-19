import "./styles.css"

import TodoList from "./TodoList"

const todoLists = {}

function addButtonListeners() {
    const mainLinks = document.querySelector(".main-links")
    const linkButtons = [...mainLinks.children]
    linkButtons.forEach(buttonElement => {
        buttonElement.addEventListener("click", () => {
            const newList = new TodoList(buttonElement.textContent)
            todoLists[buttonElement.textContent] = newList
            todoLists[buttonElement.textContent].render()
        })
    })
}

addButtonListeners()