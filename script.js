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
const innerColumnsForTasks = document.querySelectorAll(".innerColumnForTasks");
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

// Funkcja tworzenia i usuwania nowego zadania
// function createTask () {

// 	return taskId;
// taskContent.classList.add('task-content');

// const deleteButton = document.createElement('button');
// deleteButton.innerHTML = '<i class="fas fa-minus-circle"></i>';
// deleteButton.classList.add('delete-button');

// taskElement.setAttribute('id', taskId);
// taskElement.appendChild(taskContent);
// taskElement.appendChild(deleteButton);

// tu dodaje do stanu !

// return taskElement;
// }

// Obsługa kliknięcia na przyciskach usuwania
columns.forEach((column) => {
	column.addEventListener('click', (event) => {
		const deleteButton = event.target.closest('.delete-button');
		if (deleteButton) {
			const taskToDelete = deleteButton.closest('.task');
			const taskId = taskToDelete.id;
			if (taskId) {
				deleteTaskfromStateById(taskId); // tu usówa ze stanu !
				renderTasks();
				updateCounters();
			}
		}
	});
});

// Funkcja, która sprawia, że element jest przeciągalny
function makeTaskDraggable(taskElement) {
	taskElement.draggable = true;

	taskElement.addEventListener('dragstart', () => {
		taskElement.classList.add('is-dragging');
	});

	taskElement.addEventListener('dragend', () => {
		taskElement.classList.remove('is-dragging');
	});
}

// Obsługa przeciągania i upuszczania elementów
innerColumnsForTasks.forEach((zone) => {
	zone.addEventListener('dragover', (e) => {
		e.preventDefault();

		const draggingTask = document.querySelector('.is-dragging');

		if (draggingTask && draggingTask.parentNode !== zone) {
			zone.appendChild(draggingTask);

			const taskId = draggingTask.id;
			const taskText = draggingTask.querySelector('.task-content').textContent;

			updateTaskStateInColumn(zone, taskId, taskText);
			updateCounters();
		}

		const mouseY = e.clientY;
		const bottomTask = insertAboveTask(zone, mouseY);
		const curTask = document.querySelector('.is-dragging');

		if (!bottomTask) {
			zone.appendChild(curTask);
		} else {
			zone.insertBefore(curTask, bottomTask);
		}
	});
});

// // Funkcja do określania pozycji myszy względem zadań
// const insertAboveTask = (zone, mouseY) => {
// 	const els = zone.querySelectorAll('.task:not(.is-dragging)');

// 	let closestTask = null;
// 	let closestOffset = Number.NEGATIVE_INFINITY;

// 	els.forEach((task) => {
// 		const { top } = task.getBoundingClientRect();
// 		const offset = mouseY - top;

// 		if (offset < 0 && offset > closestOffset) {
// 			closestOffset = offset;
// 			closestTask = task;
// 		}
// 	});

// 	return closestTask;
// };

// // Obsługa usuwania wszystkich zadań z kolumn
// function clearAllTasksFromColumn(column) {
// 	const tasks = column.querySelectorAll('.task');
// 	tasks.forEach((task) => {
// 		task.remove();
// 	});
// 	clearAllTasksFromState();
// 	updateCounters();
// }

// // Nasłuchiwanie na kliknięcie przycisku usuwania wszystkich zadań
// clearAllTasks.addEventListener('click', () => {
// 	columns.forEach((column) => {
// 		clearAllTasksFromColumn(column);
// 	});
// });
