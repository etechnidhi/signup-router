export default {
    state: {
        todos : [],
        addTodo: {
            message: ""
        }
    },
    getters: {
        allTodos: state => state.todos,
        getCompletedTodos: (state) => {
            return state.todos.filter( todo => todo.isCompleted)
        }
    },
    mutations: {
        addTodo: (state, todo) => {
            state.todos.push(todo);
        },
        completeTodo : (state, id) => {
            state.todos.map((todo) => {
                 // eslint-disable-next-line
                console.log(id , todo.id)
                if(id === todo.id)
                    todo.isCompleted = true;
                return todo;
            })
        },
        updateMessage : (state, msg) => {
            state.addTodo.message = msg;
        }
    }
}