import React from 'react';
import BackLink from 'components/shared/BackLink';
import DashboardList from './DashboardList';

require('./dashboard.scss');

const { string, array, shape, number } = React.PropTypes;

function Dashboard(props) {
	const { dashboard: { items, name, id } } = props;

	return (
		<article className='dashboard'>
			<div className='container'>
				<BackLink text={name} to={`/events/${id}`} />
				<DashboardList items={items} />
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
