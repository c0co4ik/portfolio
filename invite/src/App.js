import React, { useEffect, useState } from 'react'
import './index.scss'
import { Success } from './components/Success'
import { Users } from './components/Users'

// Тут список пользователей: https://reqres.in/api/users

function App() {
	const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState('');
	const [invites, setInvites] = useState([]);
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		fetch('https://reqres.in/api/users')
			.then(res => res.json())
			.then(json => {
				setUsers(json.data)
			})
      .catch((err) => {
        console.error(err);
        alert('Произошла ошибка при получении пользователей')
      })
      .finally(() => setIsLoading(false))
	}, [])

	const handleSuccess = () => {
		setSuccess(true)
	}

	const handleChangeInvites = (id) => {
		if(invites.includes(id)) {
			setInvites((prev) => prev.filter((_id) => _id !== id))
		} else {
			setInvites((prev) => [...prev, id])
		}
	}

  const handleChangeInput = (e) => {
    setInputValue(e.target.value)
  }

	return (
		<div className='App'>
			{success ? <Success count={invites.length}/> : <Users handleSuccess={handleSuccess} invites={invites} handleChangeInvites={handleChangeInvites} handleChangeInput={handleChangeInput} inputValue={inputValue} isLoading={isLoading} items={users} /> }
		</div>
	)
}

export default App
