import TodoList from "./TodoList";

export default class LocalStorage {
    static setTodoList(todoList) {
        const listObj = { title: todoList.title }
        const listObjList = []

        for (const todo of todoList.list) {
            listObjList.push({ title: todo.title, dueDate: todo.dueDate, priority: todo.priority })
        }

        listObj.list = listObjList

        localStorage.setItem(todoList.title, JSON.stringify(listObj))
        console.log(JSON.stringify(listObj))
    }

    static isTodoListStored(title) {
        return localStorage.getItem(title) !== null
    }

    static getTodoList(title) {
        const listObj = JSON.parse(localStorage.getItem(title))

        const todoList = new TodoList(listObj.title, listObj.list)

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

    static addProject() {

    }
}