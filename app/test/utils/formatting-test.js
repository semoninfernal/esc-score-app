import { expect } from 'chai';
import { percent, apk, volume } from '../../src/utils/formatting';

describe('formatting', () => {
	describe('percent', () => {
		it('should format float numbers with comma', () => {
			expect(percent(4.5)).to.equal('4,5');
		});
		it('should format integer numbers with single fractional digit 0', () => {
			expect(percent(5)).to.equal('5,0');
		});
		it('should format two digit integers with single fractional digit 0', () => {
			expect(percent(10.5)).to.equal('10,5');
		});
		it('should format single digit integer without fractional digit', () => {
			expect(percent(5)).to.equal('5,0');
		});
		it('should format double digit integer without fractional digit', () => {
			expect(percent(11)).to.equal('11,0');
		});
	});

	describe('apk', () => {
		it('should replace dots with comma', () => {
			expect(apk(1.2)).to.equal('1,20');
		});

		it('should use two points precision', () => {
			expect(apk(0.124)).to.equal('0,12');
		});

		it('should round correctly', () => {
			expect(apk(0.125)).to.equal('0,13');
		});
	});

	describe('volume', () => {
		it('should default to convert ml to cl', () => {
			expect(volume(330)).to.equal('33');
		});
	});
});
