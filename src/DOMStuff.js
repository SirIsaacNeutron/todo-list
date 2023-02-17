import TodoList from "./TodoList"

export default class DOMStuff {
    constructor() {

    }

    static addButtonListeners = () => {
        const mainLinks = document.querySelector(".main-links")
        const linkButtons = [...mainLinks.children]
        linkButtons.forEach(buttonElement => {
            buttonElement.addEventListener("click", () => {
                this.renderTodoList(buttonElement.textContent)
            })
        })
    }

    static renderTodoList = listName => {
        const main = document.querySelector("main")
        main.replaceChildren()

        const title = document.createElement("h2")
        title.textContent = listName

        main.appendChild(title)
    }
}