export function mergeClassNames(...args) {
	return args.reduce((classes, arg = '') => [...classes, ...(arg.split(' '))], [])
		.filter((value, index, self) => value && self.indexOf(value) === index)
		.join(' ');
}

export function classNames(obj, props = {}) {
	return mergeClassNames(typeof obj === 'string' ? obj : Object.keys(obj)
		.filter(className => obj[className])
		.reduce((acc, className) => [...acc, className], [])
		.join(' '), props.className);
}
