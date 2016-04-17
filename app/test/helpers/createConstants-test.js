import { expect } from 'chai';
import createConstants from '../../src/helpers/createConstants';

describe('create constants in namespace "test"', () => {
	it('should return CREATE constants', () => {
		const { CREATE, CREATE_SUCCESS, CREATE_FAIL } = createConstants('test');

		expect(CREATE).is.equal('test_CREATE');
		expect(CREATE_SUCCESS).is.equal('test_CREATE_SUCCESS');
		expect(CREATE_FAIL).is.equal('test_CREATE_FAIL');
	});

	it('should return READ constants', () => {
		const { READ, READ_SUCCESS, READ_FAIL } = createConstants('test');

		expect(READ).is.equal('test_READ');
		expect(READ_SUCCESS).is.equal('test_READ_SUCCESS');
		expect(READ_FAIL).is.equal('test_READ_FAIL');
	});

	it('should return UPDATE constants', () => {
		const { UPDATE, UPDATE_SUCCESS, UPDATE_FAIL } = createConstants('test');

		expect(UPDATE).is.equal('test_UPDATE');
		expect(UPDATE_SUCCESS).is.equal('test_UPDATE_SUCCESS');
		expect(UPDATE_FAIL).is.equal('test_UPDATE_FAIL');
	});

	it('should return CREATE constants', () => {
		const { DELETE, DELETE_SUCCESS, DELETE_FAIL } = createConstants('test');

		expect(DELETE).is.equal('test_DELETE');
		expect(DELETE_SUCCESS).is.equal('test_DELETE_SUCCESS');
		expect(DELETE_FAIL).is.equal('test_DELETE_FAIL');
	});
});
