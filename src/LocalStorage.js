import TodoList from "./TodoList"
import Todo from "./Todo"

export default class LocalStorage {
    static setTodoList(todoList) {
        const listObj = { title: todoList.title }
        const listObjList = []

        for (const todo of todoList.list) {
            listObjList.push({ title: todo.title, dueDate: todo.dueDate, priority: todo.priority })
        }

        listObj.list = listObjList

        localStorage.setItem(todoList.title, JSON.stringify(listObj))
        //console.log(JSON.stringify(listObj))
    }

    static remove(key) {
        localStorage.removeItem(key)
    }

    static isTodoListStored(title) {
        return localStorage.getItem(title) !== null
    }

    static getTodoList(title) {
        const listObj = JSON.parse(localStorage.getItem(title))

        const todoList = new TodoList(listObj.title)

        for (const todoObj of listObj.list) {
            todoList.addTodo(new Todo(todoObj.title, todoObj.dueDate, todoObj.priority))
        }

        return todoList
    }

    static loadTodoListsInto(todoLists) {
        const mainLinks = document.querySelector(".main-links")
        const linkButtons = [...mainLinks.children]
        linkButtons.forEach(buttonElement => {
            const todoListTitle = buttonElement.textContent
            
            if (LocalStorage.isTodoListStored(todoListTitle)) {
                const list = LocalStorage.getTodoList(todoListTitle)
                todoLists[todoListTitle] = list
            }
        })
    }

    static loadProjectsInto(projectList) {
        const mainLinks = document.querySelector(".main-links")
        const linkButtons = [...mainLinks.children]
        const linkButtonNames = linkButtons.map(buttonElement => buttonElement.textContent)

        // The check for 'debug' is to make the project work on GitHub Pages
        // The 'debug' key seems to always be there on GitHub Pages's localStorage
        // I didn't know this when I made this project... this is the fastest way to fix it
        // :P lesson learned: don't load things from localStorage the way I did in this project
        const projectNames = Object.keys(localStorage).filter(key => !linkButtonNames.includes(key) && key !== "debug")

        projectNames.forEach(name => {
            const list = LocalStorage.getTodoList(name)
            projectList.addProject(list)
        })

    }
}