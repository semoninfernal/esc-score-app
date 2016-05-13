import { combineReducers } from 'redux';
import { reducer as dashboards} from './dashboards';
import { reducer as eventItems } from './eventItems';
import { reducer as events } from './events';
import { reducer as itemScores } from './itemScores';
import { reducer as members } from './members';
import { reducer as scoreTypes } from './scoreTypes';
import { reducer as users } from './users';

export default combineReducers({
	dashboards,
	eventItems,
	events,
	itemScores,
	members,
	scoreTypes,
	users
});
