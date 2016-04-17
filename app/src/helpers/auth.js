const authCookie = 'auth';

function getCookies() {
	return document.cookie.split(';')
		.reduce((cookies, cookie) => {
			const [key, value] = cookie.split('=');
			return {
				...cookies,
				[key]: value
			};
		}, {});
}

function setAuth(data) {
	document.cookie = `${authCookie}=${JSON.stringify(data)};path=/;`;
}

function getAuth(req) {
	let auth = null;

	if (__SERVER__) {
		auth = req.cookies[authCookie];
	} else {
		auth = getCookies()[authCookie];
	}
	return auth ? JSON.parse(auth) : {};
}

function removeAuth() {
	document.cookie = `${authCookie}=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export {
	getAuth,
	setAuth,
	removeAuth
};
