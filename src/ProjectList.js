import TodoList from "./TodoList"

export default class ProjectList {
    constructor() {
        this.projectList = []

        this.render = this.render.bind(this)
    }

    render() {
        const projectLinks = document.querySelector(".project-links")
        projectLinks.replaceChildren()

        for (let i = 0; i < this.projectList.length; ++i) {
            const currentProject = this.projectList[i]

            const projectLink = document.createElement("div")
            projectLink.classList.add("project-link")

            const checkbox = document.createElement("input")
            checkbox.setAttribute("type", "checkbox")
            checkbox.classList.add("todo-checkbox")

            checkbox.addEventListener("click", () => {
                this.projectList.splice(i, 1)

                // Delete all content in the main area
                const main = document.querySelector("main")
                main.replaceChildren()

                this.render()
            })

            projectLink.appendChild(checkbox)

            const projectTitle = document.createElement("p")
            projectTitle.textContent = currentProject.title

            projectLink.appendChild(projectTitle)

            projectLink.addEventListener("click", e => {
                if (e.target.tagName === "INPUT") { return }

                currentProject.render()
            })

            projectLinks.appendChild(projectLink)
        }

        const addProjectBtn = document.createElement("button")
        addProjectBtn.classList.add("add-project-btn")
        addProjectBtn.textContent = "+ Add project"

        addProjectBtn.addEventListener("click", () => {
            const form = document.createElement("form")
            form.setAttribute("method", "POST")
            form.classList.add("add-project-form")

            const input = document.createElement("input")
            input.setAttribute("type", "text")
            input.setAttribute("name", "title")
            input.setAttribute("required", "")
            input.setAttribute("placeholder", "Project title")

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
                form.replaceWith(addProjectBtn)
            })

            form.addEventListener("submit", e => {
                e.preventDefault()

                const newProject = new TodoList(input.value)
                this.projectList.push(newProject)

                // Redraw the project list
                this.render()
            })

            addProjectBtn.replaceWith(form)
        })

        projectLinks.appendChild(addProjectBtn)
    }
}