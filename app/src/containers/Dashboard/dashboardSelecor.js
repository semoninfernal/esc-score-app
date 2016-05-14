import { createSelector } from 'reselect';
import { groupBy, orderBy } from 'utils/lodash';
import { isLoaded } from 'utils/dependencies';

function formatMemberScores(groupedScores, members) {
	return Object.keys(groupedScores).reduce((acc, memberId) => {
		const id = parseInt(memberId, 0);
		return [
			...acc,
			{
				id,
				member: members.find(member => member.id === id).username,
				score: groupedScores[memberId].reduce((sum, score) => sum + score.value, 0)
			}
		];
	}, []);
}

function formatItems(items, members) {
	return items.map(item => {
		const groupedScores = groupBy(Object.values(item.scores), score => score.member);
		const memberScores = formatMemberScores(groupedScores, members);
		return {
			...item,
			totalScore: memberScores.reduce((sum, score) => sum + score.score, 0),
			scores: orderBy(memberScores, 'score', 'desc')
		};
	}).filter(item => item.scores.length > 0);
}

function formatDashboard(dashboard, members) {
	return isLoaded(dashboard, members) ? {
		...dashboard,
		items: orderBy(
			formatItems(Object.values(dashboard.items || {}), members.items),
			'totalScore',
			'desc'
		)
	} : { loaded: false };
}

const dashboardSelector = ({ data: { dashboards }}, { params: { id }}) => ({
	loading: dashboards.loading[id],
	loaded: dashboards.loaded[id],
	...dashboards.items[id]
});

const membersSelector = ({ data: { members } }, { params: { id} }) => ({
	...members,
	loading: members.loading[id],
	loaded: members.loaded[id],
	items: Object.values(members.items)
		.filter(member => member.eventId === parseInt(id, 0))
});

const userSelector = state => state.auth.user;

const dataSelector = createSelector(
	dashboardSelector,
	membersSelector,
	userSelector,
	(dashboard, members, user) => ({
		dashboard: formatDashboard(dashboard, members),
		user
	})
);

const selector = createSelector(
	dataSelector,
	data => ({
		data
	})
);

export {
	selector,
	dashboardSelector,
	membersSelector
};
