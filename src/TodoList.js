import { format } from "date-fns"

import Todo from "./Todo"

export default class TodoList {
    constructor(title) {
        this.title = title
        this.list = []

        this.addTodo = this.addTodo.bind(this)
        this.render = this.render.bind(this)
    }

    addTodo(todo) {
        this.list.push(todo)
    }

    render() {
        const main = document.querySelector("main")
        main.replaceChildren()

        const title = document.createElement("h2")
        title.textContent = this.title

        main.appendChild(title)

        const todos = document.createElement("div")
        todos.classList.add("todos")

        for (let i = 0; i < this.list.length; ++i) {
            const todo = document.createElement("article")
            todo.classList.add("todo")
            
            if (this.list[i].priority === "Low") {
                todo.classList.add("low-priority")
            }
            else if (this.list[i].priority === "Medium") {
                todo.classList.add("med-priority")
            }
            else {
                todo.classList.add("high-priority")
            }

            const todoCheckbox = document.createElement("input")
            todoCheckbox.setAttribute("type", "checkbox")
            todoCheckbox.classList.add("todo-checkbox")

            todoCheckbox.addEventListener("click", () => {
                this.list.splice(i, 1)

                // If I used todo.remove() this listener wouldn't render the page correctly
                // after deletions. i would not apply to the correct todos after a deletion, and
                // this would cause the page to render the wrong todos once it is re-selected
                this.render()
            })

            todo.appendChild(todoCheckbox)

            const todoTitle = document.createElement("p")
            todoTitle.classList.add("todo-title")
            todoTitle.textContent = this.list[i].title

            todoTitle.addEventListener("click", () => {
                const todoTitleInput = document.createElement("input")
                todoTitleInput.value = todoTitle.textContent

                todoTitleInput.addEventListener("keydown", e => {
                    if (e.code === "Enter") {
                        if (todoTitleInput.value === "") {
                            alert("Todos can't have empty titles.")
                            return
                        }
                        this.list[i].title = todoTitleInput.value
                        todoTitle.textContent = todoTitleInput.value

                        todoTitleInput.replaceWith(todoTitle)
                    }
                })

                todoTitle.replaceWith(todoTitleInput)
            })

            todo.appendChild(todoTitle)

            const todoDate = document.createElement("p")
            todoDate.textContent = this.list[i].dueDate
            todoDate.classList.add("date")

            todoDate.addEventListener("click", () => {
                const dateInput = document.createElement("input")
                dateInput.setAttribute("type", "date")
                dateInput.classList.add("date")

                dateInput.addEventListener("change", () => {
                    const dateString = format(new Date(dateInput.value), "MM-dd-yyyy")

                    this.list[i].dueDate = dateString
                    todoDate.textContent = dateString
                    dateInput.replaceWith(todoDate)
                })

                todoDate.replaceWith(dateInput)
            })

            todo.addEventListener("click", e => {
                if (e.target.tagName === "P" || e.target.tagName === "INPUT") { return }

                if (todo.classList.contains("low-priority")) {
                    todo.classList.remove("low-priority")
                    todo.classList.add("med-priority")
                    this.list[i].priority = "Medium"
                }
                else if (todo.classList.contains("med-priority")) {
                    todo.classList.remove("med-priority")
                    todo.classList.add("high-priority")
                    this.list[i].priority = "High"
                }
                else {
                    todo.classList.remove("high-priority")
                    todo.classList.add("low-priority")
                    this.list[i].priority = "Low"

                }
            })

            todo.appendChild(todoDate)

            todos.appendChild(todo)
        }

        const addTodoBtn = document.createElement("button")
        addTodoBtn.classList.add("add-todo-btn")
        addTodoBtn.textContent = "+ Add todo"

        addTodoBtn.addEventListener("click", () => {
            const form = document.createElement("form")
            form.setAttribute("method", "POST")
            form.classList.add("add-todo-form")

            const input = document.createElement("input")
            input.setAttribute("type", "text")
            input.setAttribute("name", "title")
            input.setAttribute("required", "")
            input.setAttribute("placeholder", "Todo title")

            form.appendChild(input)

            const formBtns = document.createElement("div")
            formBtns.classList.add("form-btns")

            const submitBtn = document.createElement("button")
            submitBtn.textContent = "Add"
            submitBtn.classList.add("form-btn")
            submitBtn.classList.add("submit-btn")

            formBtns.appendChild(submitBtn)
            
            const cancelBtn = document.createElement("button")
            cancelBtn.textContent = "Cancel"
            cancelBtn.classList.add("form-btn")
            cancelBtn.classList.add("cancel-btn")

            formBtns.appendChild(cancelBtn)

            form.appendChild(formBtns)

            cancelBtn.addEventListener("click", () => {
                form.replaceWith(addTodoBtn)
            })

            form.addEventListener("submit", e => {
                e.preventDefault()

                const newTodoTitle = input.value

                const newTodo = new Todo(newTodoTitle, "", "Click to add date", "Low")

                this.addTodo(newTodo)

                // Redraw the whole page
                this.render()
            })

            addTodoBtn.replaceWith(form)
        })

        todos.appendChild(addTodoBtn)
        main.appendChild(todos)
    }
}