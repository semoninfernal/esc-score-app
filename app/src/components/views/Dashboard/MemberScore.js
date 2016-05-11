import React, { Component } from 'react';

const { number, string } = React.PropTypes;

class MemberScore extends Component {
	render() {
		const { member, score } = this.props;

		return (
			<li>
				<span>{member}</span>
				<span className='score'>{score}</span>
			</li>
		);
	}
}

MemberScore.propTypes = {
	member: string.isRequired,
	score: number.isRequired
};

export default MemberScore;
