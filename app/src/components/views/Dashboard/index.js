import React from 'react';
import DashboardList from './DashboardList';

require('./dashboard.scss');

const { string, array, shape } = React.PropTypes;

function Dashboard(props) {
	const { dashboard: { items, name } } = props;

	return (
		<div className='dashboard'>
			<h1>{name}</h1>
			<DashboardList items={items} />
		</div>
	);
}

Dashboard.propTypes = {
	dashboard: shape({
		items: array.isRequired,
		name: string.isRequired
	}).isRequired
};

export default Dashboard;
