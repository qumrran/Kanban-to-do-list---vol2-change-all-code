import {
	addTaskToState,
	deleteTaskfromStateById,
	clearAllTasksFromState,
	updateTaskTextinState,
} from './state.js';

import { renderTasks } from './render.js';

const addTaskButton = document.querySelector('.add-task-btn');
const taskInput = document.querySelector('.task-input');
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

// Obsługa kliknięcia na przyciskach usuwania i edycji
columns.forEach((column) => {
	column.addEventListener('click', (event) => {
		const deleteButton = event.target.closest('.delete-button');
		const editButton = event.target.closest('.edit-button');

		if (deleteButton) {
			const taskToDelete = deleteButton.closest('.task');
			const taskId = taskToDelete.id;
			if (taskId) {
				deleteTaskfromStateById(taskId);
				renderTasks();
				updateCounters();
			}
		}

		if (editButton) {
			const taskToEdit = editButton.closest('.task');
			const taskId = taskToEdit.id;
			if (taskId) {
				handleEditTask(taskId);
			}
		}
	});
});

function handleEditTask(taskId) {
	const taskElement = document.getElementById(taskId);
	const taskText = taskElement.textContent;

	const editModal = document.getElementById('editModal');
	const modalInput = document.getElementById('modalInput');

	modalInput.value = taskText;
	editModal.style.display = 'block';

	const closeButton = document.getElementsByClassName('close')[0];
	closeButton.addEventListener('click', () => {
		hideModalWithAnimation(editModal);
	});

	const saveButton = document.getElementById('saveButton');
	saveButton.addEventListener('click', () => {
		const newText = modalInput.value;
		if (newText.trim().length > 0) {
			taskElement.textContent = newText;
			updateTaskTextinState(taskId, newText);
			renderTasks();
			hideModalWithAnimation(editModal);
		} else {
			const alertModal = document.getElementById('alertInfo');
			alertModal.style.display = 'block';
			const closeAlertButton = document.querySelector('.closeAlert');
			closeAlertButton.addEventListener('click', () => {
				hideModalWithAnimation(alertModal);
			});
		}
	});
}

//animacja modalu
function hideModalWithAnimation(modal) {
	modal.classList.add('hideModal');
	setTimeout(function () {
		modal.classList.remove('hideModal');
		modal.style.display = 'none';
	}, 300);
}

export { updateCounters };
