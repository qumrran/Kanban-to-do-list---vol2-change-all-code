import { state } from './state.js';

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
		return taskElement;
	}

	// Renderowanie zadań w każdej kolumnie
	state.toDoState.forEach((task) => {
		const taskElement = createTaskElement(task.id, task.text);
		todoColumn.appendChild(taskElement);
	});

	state.inProgressState.forEach((task) => {
		const taskElement = createTaskElement(task.id, task.text);
		inProgressColumn.appendChild(taskElement);
	});

	state.doneState.forEach((task) => {
		const taskElement = createTaskElement(task.id, task.text);
		doneColumn.appendChild(taskElement);
	});
}

export { renderTasks };
