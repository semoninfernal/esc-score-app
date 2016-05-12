import React from 'react';
import BackLink from 'components/shared/BackLink';
import DashboardList from './DashboardList';

require('./dashboard.scss');

const { string, array, shape, number } = React.PropTypes;

function getRandomIntInclusive(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateScores(id, items, update, user) {
	const promises = items.reduce((acc, item) => {
		return [
			...acc,
			...item.scores.filter(s => s.memberId.id === user.id).reduce((scores, score) => {
				return [
					...scores,
					...score.scoreIds.map(scoreId => update(id, item.id, scoreId, { value: getRandomIntInclusive(0, 10)}))
				];
			}, [])
		];
	}, []);

	return Promise.all(promises);
}

function Dashboard(props) {
	const { dashboard: { items, name, id }, toggleUpdate, update, reload, user } = props;

	return (
		<article className='dashboard'>
			<div className='container'>
				<BackLink text={name} to={`/events/${id}`} />
				<DashboardList items={items} />
				<div className='btn' style={{marginTop: '15px'}} onClick={() => toggleUpdate()}>Toggle Updates</div>
				<div className='btn' style={{marginTop: '15px'}} onClick={() => {
					updateScores(id, items, update, user).then(() => reload(id))
					.catch(err => console.log(err));}}>
					Shuffle
				</div>
			</div>
		</article>
	);
}

Dashboard.propTypes = {
	dashboard: shape({
		id: number.isRequired,
		items: array.isRequired,
		name: string.isRequired
	}).isRequired
};

export default Dashboard;
