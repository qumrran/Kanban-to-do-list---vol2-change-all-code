// Obiekt stanu
let state = {
    toDoState: [],
    inProgressState: [],
    doneState: [],
};

// Funkcja aktualizująca kolejność zadań we wszystkich kolumnach stanu
function updateAllTaskOrders() {
    const columns = Object.keys(state);
    columns.forEach(column => {
        state[column].forEach((task, index) => {
            task.order = index + 1;
        });
    });
}

// Dodawanie zadania do stanu
function addTaskToState(taskId, taskText) {
    const taskOrder = state.toDoState.length + 1;
    state.toDoState.push({ id: taskId, text: taskText, order: taskOrder });
    updateAllTaskOrders(); 
    console.log(state);
}

// Czyszczenie wszystkich zadań ze stanu
function clearAllTasksFromState() {
    state = { toDoState: [], inProgressState: [], doneState: [] };
    console.log(state);
}

// Usuwanie zadania na podstawie identyfikatora
function deleteTaskfromStateById(taskId) {
    for (let key in state) {
        state[key] = state[key].filter((task) => task.id !== taskId);
    }
    updateAllTaskOrders(); // Aktualizuj kolejność zadań
    console.log(state);
}

// Aktualizowanie stanu podczas przeciągania zadań między kolumnami
function updateTaskStateInColumn(zone, taskId, taskText, taskOrder) {
    if (zone.id === 'todo-column') {
        updateState(taskId, taskText, taskOrder, state.toDoState);
    } else if (zone.id === 'in-progress-column') {
        updateState(taskId, taskText, taskOrder, state.inProgressState);
    } else if (zone.id === 'done-column') {
        updateState(taskId, taskText, taskOrder, state.doneState);
    }

    function updateState(taskId, taskText, taskOrder, targetState) {
        targetState.push({ id: taskId, text: taskText, order: taskOrder });

        for (let key in state) {
            if (state[key] !== targetState) {
                state[key] = state[key].filter((task) => task.id !== taskId);
            }
        }

        updateAllTaskOrders(); 
        console.log(state);
    }
}

export {
    state,
    addTaskToState,
    deleteTaskfromStateById,
    clearAllTasksFromState,
    updateTaskStateInColumn,
	updateAllTaskOrders,
};
