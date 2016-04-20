import React, { Component } from 'react';
import { connect } from 'react-redux';
import Register from 'components/views/Register';

const selector = state => ({
	data: {
		username: state.gui.register.username
	}
});

class RegisterContainer extends Component {
	render() {
		const { data } = this.props;

		return (
			<Register
				{...data}
			/>
		);
	}
}

export default connect(selector)(RegisterContainer);
