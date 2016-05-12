import React from 'react';
import LoggedInHeader from './LoggedInHeader';

require('theme/theme.scss');
require('./app.scss');

function App(props) {
	const { children, user, logout } = props;

	return (
		<div className='app-container'>
			<header>
				<div className='header-content'>
					<div className='title'>Jalla Euro</div>
					{user && user.username ? <LoggedInHeader logout={logout} username={user.username} /> : null }
				</div>
			</header>
			{children}
		</div>
	);
}

export default App;
