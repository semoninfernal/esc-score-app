import React from 'react';
import { isLoaded } from 'utils/dependencies';
import Loader from 'components/shared/Loader';
import ItemScoreForm from './ItemScoreForm';

require('./itemScores.scss');

const { object, func } = React.PropTypes;

function ItemScores(props) {
	const { scores, onScoreChange } = props;

	if (!isLoaded(scores)) {
		return <Loader />;
	}

	return (
		<div className='item-scores'>
			{scores.items.map(score => (
				<ItemScoreForm key={score.scoreType} score={score} onChange={onScoreChange} />
			))}
		</div>
	);
}

ItemScores.propTypes = {
	onScoreChange: func.isRequired,
	scores: object.isRequired
};

export default ItemScores;
