import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom/server';

export default React.createClass({
	propTypes: {
		assets: PropTypes.object,
		component: PropTypes.element
	},
	render() {
		const { assets, component, store } = this.props;
		const content = component ? ReactDOM.renderToString(component) : '';

		return (
			<html>
				<head>
					<meta name='viewport' content='width=device-width, user-scalable=no' />
					{/* styles (will be present only in production with webpack extract text plugin) */}
					{Object.keys(assets.styles).map((style, key) =>
						<link href={assets.styles[style]} key={key} media='screen, projection'
							rel='stylesheet' type='text/css' charSet='UTF-8'/>
					)}

					{/* (will be present only in development mode) */}
					{/* outputs a <style/> tag with all bootstrap styles + App.scss + it could be CurrentPage.scss. */}
					{/* can smoothen the initial style flash (flicker) on page load in development mode. */}
					{/* ideally one could also include here the style for the current page (Home.scss, About.scss, etc) */}
					{Object.keys(assets.styles).length === 0 ? <style dangerouslySetInnerHTML={{__html: require('../theme/theme.scss')._style}}/> : null}
				</head>
				<body>
					<div id='content' dangerouslySetInnerHTML={{__html: content}} />
					<script dangerouslySetInnerHTML={{__html: `window.__INITIAL_STATE__=${JSON.stringify(store.getState())};`}} charSet='UTF-8'/>
					<script src={assets.javascript.main} charSet='UTF-8'/>
				</body>
			</html>
		);
	}
});
