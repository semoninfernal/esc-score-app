import React, { Component } from 'react';
import MemberScoresList from './MemberScoresList';

require('./dashboardItem.scss');

const { string, number, array } = React.PropTypes;

class DashboardItem extends Component {
	render() {
		const { description, name, scores, totalScore } = this.props;

		return (
			<li className='dashboard-item'>
				<div className='summary'>
					<div className='item-info'>
						<span className='name'>{name}</span>
						<span className='description'>{description}</span>
					</div>
					<div className='total-score'>
						{totalScore}
					</div>
				</div>
				<MemberScoresList items={scores} />

			</li>
		);
	}
}

DashboardItem.propTypes = {
	description: string.isRequired,
	name: string.isRequired,
	scores: array.isRequired,
	totalScore: number.isRequired
};

export default DashboardItem;
