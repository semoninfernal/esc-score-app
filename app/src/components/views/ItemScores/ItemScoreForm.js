import React from 'react';
import { debounce } from 'utils/lodash';

const { number, shape, string, func } = React.PropTypes;

const ItemScoresForm = React.createClass({
	getInitialState() {
		const { value } = this.props.score;
		return {
			value: typeof value === 'undefined' ? 0 : value
		};
	},

	componentDidMount() {
		this.onChangeDebounced = debounce(this.props.onChange, 500);
	},

	componentWillReceiveProps(nextProps) {
		if (this.props.score.value !== nextProps.score.value) {
			// Sync with global state
			this.setState({
				value: nextProps.score.value
			});
		}
	},

	handleChange() {
		const { id, scoreType } = this.props.score;
		const { value } = this.refs.score;
		this.setState({
			value
		});

		this.onChangeDebounced(id, scoreType, parseInt(value, 0));
	},

	render() {
		const { score } = this.props;
		const { value } = this.state;
		const sliderName = `score-${score.scoreType}`;

		return (
			<div className='item-score'>
				<label htmlFor={sliderName} className='name'>{score.name}</label>
				<div className='slider'>
					<div className='range'>
						{score.min}
					</div>
					<input
						name={sliderName}
						type='range'
						max={score.max}
						min={score.min}
						onChange={this.handleChange}
						ref='score'
						step='1'
						value={value}
					/>
					<div className='range'>
						{score.max}
					</div>
				</div>
			</div>
		);
	}
});

ItemScoresForm.propTypes = {
	onChange: func.isRequired,
	score: shape({
		id: number,
		name: string.isRequired,
		min: number.isRequired,
		max: number.isRequired,
		scoreType: number.isRequired,
		value: number
	}).isRequired
};

export default ItemScoresForm;
