import { state } from './state.js';
import { makeTaskDraggable } from './dragdrop.js';

function renderTasks() {
	const todoColumn = document.getElementById('todo-column');
	const inProgressColumn = document.getElementById('in-progress-column');
	const doneColumn = document.getElementById('done-column');

	todoColumn.innerHTML = '';
	inProgressColumn.innerHTML = '';
	doneColumn.innerHTML = '';

	// Funkcja pomocnicza do tworzenia elementów zadania
	function createTaskElement(taskId, taskText) {
		const taskElement = document.createElement('div');
		taskElement.classList.add('task');
		taskElement.textContent = taskText;
		taskElement.setAttribute('id', taskId);

		const deleteButton = document.createElement('button');
		deleteButton.innerHTML = '<i class="fas fa-minus-circle"></i>';
		deleteButton.classList.add('delete-button');
        taskElement.appendChild(deleteButton);
        makeTaskDraggable(taskElement);
        
		return taskElement;
        
	}
   

	// Funkcja dodająca zadania z danej kolumny do odpowiedniego elementu DOM
function addTasksToColumn(tasks, column) {
    tasks.forEach((task) => {
        const taskElement = createTaskElement(task.id, task.text);
        column.appendChild(taskElement);
    });
}

// Dodawanie zadań do odpowiednich kolumn
addTasksToColumn(state.toDoState, todoColumn);
addTasksToColumn(state.inProgressState, inProgressColumn);
addTasksToColumn(state.doneState, doneColumn);


}



export { renderTasks };
