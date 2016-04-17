import React from 'react';
import { Link } from 'react-router';

export default function Header() {
	const links = [
		{to: '/', text: 'Hem'},
		{to: '/karta', text: 'Karta' },
		{to: '/stallen', text: 'Ställen'}
	];
	const styles = require('./header.scss');
	return (
		<header className={styles['page-header']}>
			<nav>
				<ul>
					{links.map((link, i) => (
						<li key={i}>
							<Link activeClassName='st-active' to={link.to}>{link.text}</Link>
						</li>))}
				</ul>
			</nav>

		</header>
	);
}
