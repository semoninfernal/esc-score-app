const methodNames = ['CREATE', 'READ', 'READ_ONE', 'UPDATE', 'DELETE'];
const variantNames = ['', 'SUCCESS', 'FAIL'];

// Take a namespace and return CRUD-constants
export default function createConstants(namespace) {
	return methodNames.reduce((methods, method) => {
		return Object.assign(methods, variantNames.reduce((methodVariants, variant) => {
			const parts = variant ? [namespace, method, variant] : [namespace, method];
			methodVariants[parts.slice(1).join('_')] = parts.join('_');
			return methodVariants;
		}, methods));
	}, {});
}
