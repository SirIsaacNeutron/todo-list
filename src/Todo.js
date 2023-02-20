import { format } from "date-fns"

export default class Todo {
    constructor(title, dueDate, priority) {
        this.title = title
        this.dueDate = dueDate
        this.priority = priority

        this.getDOMTodo = this.getDOMTodo.bind(this)
    }

    getDOMTodo(todosArray, index, todoListRender) {
        const todo = document.createElement("article")
        todo.classList.add("todo")

        if (this.priority === "Low") {
            todo.classList.add("low-priority")
        } else if (this.priority === "Medium") {
            todo.classList.add("med-priority")
        } else {
            todo.classList.add("high-priority")
        }

        const todoCheckbox = document.createElement("input")
        todoCheckbox.setAttribute("type", "checkbox")
        todoCheckbox.classList.add("todo-checkbox")

        todoCheckbox.addEventListener("click", () => {
            todosArray.splice(index, 1)

            todoListRender()
        })

        todo.appendChild(todoCheckbox)

        const todoTitle = document.createElement("p")
        todoTitle.classList.add("todo-title")
        todoTitle.textContent = this.title

        todoTitle.addEventListener("click", () => {
            const todoTitleInput = document.createElement("input")
            todoTitleInput.value = todoTitle.textContent

            todoTitleInput.addEventListener("keydown", (e) => {
                if (e.code === "Enter") {
                    if (todoTitleInput.value === "") {
                        alert("Todos can't have empty titles.")
                        return
                    }
                    this.title = todoTitleInput.value
                    todoTitle.textContent = todoTitleInput.value

                    todoTitleInput.replaceWith(todoTitle)
                }
            })

            todoTitle.replaceWith(todoTitleInput)
        })

        todo.appendChild(todoTitle)

        const todoDate = document.createElement("p")
        todoDate.textContent = this.dueDate
        todoDate.classList.add("date")

        todoDate.addEventListener("click", () => {
            const dateInput = document.createElement("input")
            dateInput.setAttribute("type", "date")
            dateInput.classList.add("date")

            dateInput.addEventListener("change", () => {
                const dateString = format(new Date(dateInput.value), "MM-dd-yyyy")

                this.dueDate = dateString
                todoDate.textContent = dateString
                dateInput.replaceWith(todoDate)
            })

            todoDate.replaceWith(dateInput)
        })

        todo.addEventListener("click", (e) => {
            if (e.target.tagName === "P" || e.target.tagName === "INPUT") {
                return
            }

            if (todo.classList.contains("low-priority")) {
                todo.classList.remove("low-priority")
                todo.classList.add("med-priority")
                this.priority = "Medium"
            } else if (todo.classList.contains("med-priority")) {
                todo.classList.remove("med-priority")
                todo.classList.add("high-priority")
                this.priority = "High"
            } else {
                todo.classList.remove("high-priority")
                todo.classList.add("low-priority")
                this.priority = "Low"
            }
        })

        todo.appendChild(todoDate)

        return todo
    }
}
