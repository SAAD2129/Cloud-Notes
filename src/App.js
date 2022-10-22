import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import Note from './components/Note';
import Form from './components/Form';
function App() {
	const [alert, setAlert] = useState(null);

	const showAlert = (message, type) => {
		setAlert(
			{
				msg: message,
				type: type
			}
		)
		setTimeout(() => {
			setAlert(null)
		}, 3000);
	}
	return (
		<>
			<Navbar />
			<Alert alert={alert} />
			<div className="container">
			<h2 className='text-center mb-3'>Welcome to iNotebook your notes on the cloud</h2>
				<Form />
				<Note />
			</div>
		</>
	);
}

export default App;
