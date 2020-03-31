import React, {createContext, useReducer } from 'react';

// state
const initialState = {
    tasks: [
        {id:0, title: "Buy Some Food", done: false},
        {id:1, title: "Work On Hobby Project", done: false},
        {id:2, title: "Done Project", done: true},

    ]
};

// create context
export const TodoListContext = createContext(initialState);

// reset to default
// const reset = (initialState) => {
//     return {tasks: initialState};
// };

// reducer
const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            };

        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            };

        case 'UPDATE_TASK':
            const tasks = state.tasks.filter(task => {
                if(task.id === action.payload.id) {
                    task.id = action.payload.id;
                    task.title = action.payload.title;
                    task.done = action.payload.done;
                }
                return task;
            });
            return {
                ...state,
                tasks: tasks
            };

        default:
            return state;
    }
};

// Provider
function TodoListContextProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState);
    // provider functions
    const addTask = (task) => dispatch({ type: 'ADD_TASK', payload: task });
    const removeTask = (id) => dispatch({type: 'DELETE_TASK', payload: id});
    const updateTask = (task) => dispatch({type: 'UPDATE_TASK', payload: task});

    return (
        <TodoListContext.Provider value={{
            tasks: state.tasks,
            addTask,
            removeTask,
            updateTask}}
        >
            {children}
        </TodoListContext.Provider>
    );
}

export default TodoListContextProvider;