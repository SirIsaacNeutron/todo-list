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

                const newTodo = new Todo(newTodoTitle, "", "No date", "High")

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