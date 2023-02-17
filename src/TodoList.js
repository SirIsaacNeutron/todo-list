export default class TodoList {
    constructor(title) {
        this.title = title
        this.list = []

        this.addTodo = this.addTodo.bind(this)
    }

    addTodo(todo) {
        this.list.push(todo)
    }
}