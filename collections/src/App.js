import { useEffect, useState } from 'react'
import { Collection } from './Components/Collection'
import './index.scss'

function App() {
	const categories = [
		{ name: 'Все' },
		{ name: 'Море' },
		{ name: 'Горы' },
		{ name: 'Архитектура' },
		{ name: 'Города' },
	]
	const [collections, setCollections] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [activeCategory, setActiveCategory] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [page, setPage] = useState(1);
	useEffect(() => {
		setIsLoading(true);

		const category = activeCategory ? `category=${activeCategory}` : '' 

		fetch(`https://669dcf219a1bda3680046a82.mockapi.io/collections?page=${page}&limit=5&${category}`)
			.then(res => res.json())
			.then(json => {
				setCollections(json)
			})
			.catch(err => {
				console.warn(err)
				alert('Ошибка при получении коллекции')
			})
			.finally(() => setIsLoading(false))
	}, [activeCategory, page])

	return (
		<div className='App'>
			<h1>Моя коллекция фотографий</h1>
			<div className='top'>
				<ul className='tags'>
					{categories.map((obj, index) => (
						<li
						onClick={() => setActiveCategory(index)}
							key={obj.name}
							className={index === activeCategory ? 'active' : ''}
						>
							{obj.name}
						</li>
					))}
				</ul>
				<input
					onChange={e => setSearchValue(e.target.value)}
					value={searchValue}
					className='search-input'
					placeholder='Поиск по названию'
				/>
			</div>
			<div className='content'>
				{isLoading ? <h2>Идет загрузка...</h2> : collections
					.filter(item =>
						item.name.toLowerCase().includes(searchValue.toLowerCase())
					)
					.map((item, index) => (
						<Collection  key={index} name={item.name} images={item.photos} />
					))}
			</div>
			<ul className='pagination'>
				{[... Array(3)].map((_, i) => (
					<li key={i} onClick={() => setPage(i + 1)} className={page === i + 1 ? 'active' : ''}>{i + 1}</li>
				))}
			</ul>
		</div>
	)
}

export default App
