import "./styles.css"

import TodoList from "./TodoList"
import ProjectList from "./ProjectList"

const todoLists = {}
const projectList = new ProjectList()

function addButtonListeners() {
    const mainLinks = document.querySelector(".main-links")
    const linkButtons = [...mainLinks.children]
    linkButtons.forEach(buttonElement => {
        buttonElement.addEventListener("click", () => {
            let list
            if (!todoLists[buttonElement.textContent]) {
                list = new TodoList(buttonElement.textContent)
                todoLists[buttonElement.textContent] = list
            }
            else {
                list = todoLists[buttonElement.textContent]
            }
            todoLists[buttonElement.textContent].render()
        })
    })
}

addButtonListeners()
projectList.render()