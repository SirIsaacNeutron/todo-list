export default class ProjectList {
    constructor() {
        this.projectList = []

        this.render = this.render.bind(this)
    }

    render() {
        const projectLinks = document.querySelector(".project-links")

        for (let i = 0; i < this.projectList.length; ++i) {
            // render links
        }

        const addProjectBtn = document.createElement("button")
        addProjectBtn.classList.add("add-project-btn")
        addProjectBtn.textContent = "+ Add project"

        projectLinks.appendChild(addProjectBtn)
    }
}