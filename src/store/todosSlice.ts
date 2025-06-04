import { createSlice } from "@reduxjs/toolkit";

function nextTodoId(todos: Todo[]) {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
    return maxId + 1;
}

export type Todo = {
    id: number;
    text: string;
    completed: boolean;
    important: boolean;
};

type State = {
    todosList: Todo[];
    checkedCompleted?: boolean;
    selectedStatus: string;
    quantityNotCompletedTodos: number;
};

const todosFromStorage = window.localStorage.getItem("todoList");

const stateFromLocalStorage = todosFromStorage
    ? JSON.parse(todosFromStorage)
    : [{ id: 0, text: "Hello", completed: false, important: false }];

const initialState: State = {
    todosList: stateFromLocalStorage,
    checkedCompleted: false,
    selectedStatus: "all",
    quantityNotCompletedTodos: stateFromLocalStorage.filter((el: Todo) => !el.completed).length,
};

export const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        editQuantityNotCompleted: (state) => {
            state.quantityNotCompletedTodos = state.todosList.filter((el) => !el.completed).length;
        },
        addTodo: (state, todo) => {
            state.todosList.push({
                id: nextTodoId(state.todosList),
                text: todo.payload,
                completed: false,
                important: false,
            });
            window.localStorage.setItem("todoList", JSON.stringify(state.todosList));
        },
        deleteTodo: (state, todoId) => {
            state.todosList = state.todosList.filter((todo) => todoId.payload !== todo.id);
            if (!state.todosList.length) {
                state.checkedCompleted = false;
            }
            window.localStorage.setItem("todoList", JSON.stringify(state.todosList));
        },
        toggleCompleted: (state, todoId) => {
            state.todosList = state.todosList.map((todo) => {
                if (todo.id === todoId.payload) {
                    return {
                        ...todo,
                        completed: !todo.completed,
                    };
                }
                return todo;
            });
            window.localStorage.setItem("todoList", JSON.stringify(state.todosList));
        },
        allCompleted: (state, checked) => {
            if (checked.payload === true) {
                state.todosList = state.todosList.map((todo) => {
                    return {
                        ...todo,
                        completed: true,
                    };
                });
                state.checkedCompleted = checked.payload;
                window.localStorage.setItem("todoList", JSON.stringify(state.todosList));
            } else {
                state.todosList = state.todosList.map((todo) => {
                    return {
                        ...todo,
                        completed: false,
                    };
                });
                state.checkedCompleted = checked.payload;
                window.localStorage.setItem("todoList", JSON.stringify(state.todosList));
            }
        },
        deleteAllTodos: (state) => {
            state.todosList = [];
            state.checkedCompleted = false;
            window.localStorage.setItem("todoList", JSON.stringify(state.todosList));
        },
        deleteCompletedTodos: (state) => {
            state.todosList = state.todosList.filter((todo) => todo.completed !== true);
            if (!state.todosList.length) {
                state.checkedCompleted = false;
            }
            window.localStorage.setItem("todoList", JSON.stringify(state.todosList));
        },
        addTodoToImportant: (state, idTodo) => {
            state.todosList = state.todosList.map((todo) => {
                if (todo.id === idTodo.payload) {
                    return {
                        ...todo,
                        important: !todo.important,
                    };
                } else {
                    return todo;
                }
            });
            window.localStorage.setItem("todoList", JSON.stringify(state.todosList));
        },
        changeStatus: (state, action) => {
            state.selectedStatus = action.payload;
        },
    },
});

export const {
    addTodo,
    deleteTodo,
    toggleCompleted,
    allCompleted,
    deleteAllTodos,
    deleteCompletedTodos,
    addTodoToImportant,
    changeStatus,
    editQuantityNotCompleted,
} = todosSlice.actions;

export const todosReducer = todosSlice.reducer;
