import React from 'react';
import MemberScore from './MemberScore';

const { number, arrayOf, shape } = React.PropTypes;

function MemberScoresList(props) {
	const { items } = props;

	return (
		<ul className='member-scores'>
			{items.map(({id, ...rest}) => (
				<MemberScore key={id} {...rest} />
			))}
		</ul>
	);
}

MemberScoresList.propTypes = {
	items: arrayOf(shape({
		id: number.isRequired
	})).isRequired
};

export default MemberScoresList;
