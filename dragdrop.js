import { state, updateTaskStateInColumn, updateAllTaskOrders } from "./state.js";
import { updateCounters } from "./script.js";


const innerColumnsForTasks = document.querySelectorAll(".innerColumnForTasks");


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
			const taskText = draggingTask.textContent;

			updateTaskStateInColumn(zone, taskId, taskText);
			updateCounters();
            updateAllTaskOrders();
            console.log(state);
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

// Funkcja do określania pozycji myszy względem zadań
const insertAboveTask = (zone, mouseY) => {
	const els = zone.querySelectorAll('.task:not(.is-dragging)');

	let closestTask = null;
	let closestOffset = Number.NEGATIVE_INFINITY;

	els.forEach((task) => {
		const { top } = task.getBoundingClientRect();
		const offset = mouseY - top;

		if (offset < 0 && offset > closestOffset) {
			closestOffset = offset;
			closestTask = task;
		}
	});

	return closestTask;
};



export {makeTaskDraggable};