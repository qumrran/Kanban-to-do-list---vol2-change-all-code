import {
	addTaskToState,
	deleteTaskfromStateById,
	clearAllTasksFromState,
	updateTaskStateInColumn,
} from './state.js';

import { renderTasks } from './render.js';

const addTaskButton = document.querySelector('.add-task-btn');
const taskInput = document.querySelector('.task-input');
const todoColumn = document.querySelector('#todo-column');
const columns = document.querySelectorAll('.column');

const clearAllTasks = document.querySelector('.clear-tasks-btn');





// Obsługa dodawania nowego zadania
addTaskButton.addEventListener('click', () => {
	const taskText = taskInput.value.trim();
	const taskId = Date.now().toString();
	if (taskText !== '') {
		addTaskToState(taskId, taskText);
		taskInput.value = '';
		renderTasks();
		updateCounters();
		
	}
});

// Aktualizacja liczników zadań w kolumnach
function updateCounters() {
	columns.forEach((column) => {
		const tasks = column.querySelectorAll('.task');
		const taskCountElement = column.querySelector('.task-count');
		taskCountElement.textContent = tasks.length;
	});
}

clearAllTasks.addEventListener('click', clearAllTasksFromColumn);

// Obsługa usuwania wszystkich zadań z kolumn
function clearAllTasksFromColumn() {
	clearAllTasksFromState();
	renderTasks();
	updateCounters();
}



// Obsługa kliknięcia na przyciskach usuwania
columns.forEach((column) => {
	column.addEventListener('click', (event) => {
		const deleteButton = event.target.closest('.delete-button');
		if (deleteButton) {
			const taskToDelete = deleteButton.closest('.task');
			const taskId = taskToDelete.id;
			if (taskId) {
				deleteTaskfromStateById(taskId); 
				renderTasks();
				updateCounters();
			}
		}
	});
});


export {updateCounters};

