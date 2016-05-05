import React from 'react';
import ItemScoreForm from './ItemScoreForm';

function ItemScore(props) {
	const { score: { id, value, scoreType } } = props;

	return (
		<div className='item-score'>
			<ItemScoreForm id={id} initialValues={{value}} scoreType={scoreType} />
		</div>
	);
}

export default ItemScore;
