function floatNumber(value, precision = 2) {
	return Number.prototype.toFixed.call(value, precision).replace('.', ',');
}

export function apk(number) {
	return floatNumber(number);
}

export function percent(number) {
	return floatNumber(number, 1);
}

export function volume(volumeInMl, unit = 'cl') {
	switch (unit) {
		case 'cl':
			return (volumeInMl / 10).toString();
		default:
			return volumeInMl;
	}
}
