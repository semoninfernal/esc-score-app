import React, { Component } from 'react';

require('theme/theme.scss');
require('./App.scss');

class AppContainer extends Component {
	render() {
		return (
			<div>
				<p>This is the app</p>
			</div>
		);
	}
}

export default AppContainer;
