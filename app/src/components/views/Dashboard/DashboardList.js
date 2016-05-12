import React from 'react';
import FlipMove from 'react-flip-move';
import DashboadItem from './DashboardItem';

const { number, arrayOf, shape } = React.PropTypes;

function DashboardList(props) {
	const { items } = props;

	return (
		<FlipMove className='dashboard-list' typeName='ul'>
			{items.map(({id, ...rest}) => (
				<DashboadItem key={id} {...rest} />
			))}
		</FlipMove>
	);
}

DashboardList.propTypes = {
	items: arrayOf(shape({
		id: number.isRequired
	})).isRequired
};

export default DashboardList;
