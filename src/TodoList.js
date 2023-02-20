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
        // console.log(this.list)
        const main = document.querySelector("main")
        main.replaceChildren()

        const title = document.createElement("h2")
        title.textContent = this.title

        main.appendChild(title)

        const todos = document.createElement("div")
        todos.classList.add("todos")

        for (let i = 0; i < this.list.length; ++i) {
            const todo = this.list[i].getDOMTodo(this.list, i, this.render)
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
                const newTodo = new Todo(newTodoTitle, "Click to add date", "Low")
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