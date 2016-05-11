import React from 'react';
import DashboadItem from './DashboardItem';

const { number, arrayOf, shape } = React.PropTypes;

function DashboardList(props) {
	const { items } = props;

	return (
		<ul>
			{items.map(({id, ...rest}) => (
				<DashboadItem key={id} {...rest} />
			))}
		</ul>
	);
}

DashboardList.propTypes = {
	items: arrayOf(shape({
		id: number.isRequired
	})).isRequired
};

export default DashboardList;
