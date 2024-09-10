export default class Model{
	constructor() {
		this.tasks = [];
		this.loadFromLocalStorage();
	}
	
	// Метод для загрузки локальных данных из localStorage
	loadFromLocalStorage() {
		const dataTasks = localStorage.getItem('tasks');
		if(dataTasks) {
			this.tasks = JSON.parse(dataTasks)
		};
	}

	// Метод для сохранения локальных данных
	saveToLocalStorage() {
		localStorage.setItem('tasks', JSON.stringify(this.tasks));
	}

	// Создаем задачу
	addTask(nameTask) {
		// Создаем id для задачи так, что бы оно не повторялось т.е было уникальным
		let id = 1;
		if(this.tasks.length >= 1) {
			id = this.tasks[this.tasks.length - 1].id + 1;
		}

		// Создаем объект с задачей
		const newTask = {
			name: nameTask,
			id: id,
			status: 'active',
			created: new Date()
		}
		this.tasks.push(newTask)
		this.saveToLocalStorage();
		return newTask;
	}

	// Находим задачу по ее id
	findCurrentItem(id) {
		const currentItem = this.tasks.find(function(item) {
			return item.id == id;
		});
		return currentItem;
	}

	// Редактирование статуса задачи
	editStatus(id) {
		const currentItem = this.findCurrentItem(id);
		if(currentItem.status == 'active') {
			currentItem.status = 'done'
		} else {
			currentItem.status = 'active'
		}
		this.saveToLocalStorage();
		return currentItem
	}

	// Удаление задачи
	taskDelete(id) {
		const indexCurrentItem = this.tasks.findIndex(item => item.id == id);
		if(indexCurrentItem !== -1) {
			this.tasks.splice(indexCurrentItem, 1)
		}
		this.saveToLocalStorage();
	}

	// Запрос погоды с сервера
	async getWeatherData() {
		const url = 'http://api.weatherstack.com/current?access_key=626c3289966e80bba95700ac3455ee6d&query=Kotlas';
		const options = {
			method: 'GET'
		};
	
		let store = {
			city: 'Kotlas',
			observationTime: '00:00 AM',
			temperature: 0
		};
	
		try {
			const response = await fetch(url, options);
			const data = await response.json();
			const { 
				current: { observation_time, temperature },
				location: { name }
			} = data;
			store = {
				...store,
				observationTime: observation_time,
				city: name,
				temperature
			};
			return store;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	async getWeather() {
		try {
			const weatherData = await this.getWeatherData();
			return weatherData;
		} catch (error) {
			console.log(error);
			return null
		}
	}
	
}