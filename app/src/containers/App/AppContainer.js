import React, { Component } from 'react';

const { node } = React.PropTypes;

require('theme/theme.scss');

class AppContainer extends Component {
	render() {
		const { children } = this.props;

		return (
			<div>
				<p>This is the app</p>
				{children}
			</div>
		);
	}
}

AppContainer.propTypes = {
	children: node.isRequired
};

export default AppContainer;
