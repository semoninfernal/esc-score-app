import React from 'react';
import FlipMove from 'react-flip-move';
import MemberScore from './MemberScore';

const { number, arrayOf, shape } = React.PropTypes;

function MemberScoresList(props) {
	const { items } = props;

	return (
		<FlipMove className='member-scores' typeName='ul'>
			{items.map(({id, ...rest}) => (
				<MemberScore key={id} {...rest} />
			))}
		</FlipMove>
	);
}

MemberScoresList.propTypes = {
	items: arrayOf(shape({
		id: number.isRequired
	})).isRequired
};

export default MemberScoresList;
