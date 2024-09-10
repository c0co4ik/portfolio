import Model from "./model.js";
import View from "./view.js";

const model = new Model();
const view = new View(model.tasks);

// Добавление задачи(Избегаем ошибок с помощью условия)
if(view.elements.form) {
	view.elements.form.addEventListener('submit', (e) => {
		e.preventDefault();
		const nameTask = view.elements.input.value.trim();
		if(!nameTask) {
			alert('Введена пустая строка')
		} else {
			view.renderTask(model.addTask(nameTask));
			view.clearInput();
		}
	})
}

// Редактирование задач и удаление(Избегаем ошибок с помощью условия)
if(view.elements.todoList) {
	view.elements.todoList.addEventListener('click', (e) => {
		if(e.target.closest('.todo-item')) {
			const itemId = e.target.closest('.todo-item').getAttribute('data-id');
			// Редактирование
			if(e.target.classList.contains('todo-item-label')) {
				view.changeStatus(model.editStatus(itemId));
				// Удаление
			} else if(e.target.hasAttribute('data-delete')) {
				model.taskDelete(itemId)
				view.deleteTask(itemId)
			}
		}
	})
}

// Поиск задачи(Избегаем ошибок с помощью условия)
if(view.elements.searchTask) {
	view.elements.searchTask.addEventListener('keyup', (e) => {
		const searchedText = e.target.value.toLowerCase();
		view.elements.todoList.querySelectorAll('.todo-item').forEach((el) => {
			const itemText = el.querySelector('span').lastChild.data.toLowerCase();
			if(itemText.indexOf(searchedText) != -1) {
				el.style.display = 'block'
			} else {
				el.style.display = 'none'
			}
		})
	})
}

// Погода
model.getWeather().then(res => {
	view.viewWeather(res)
});

