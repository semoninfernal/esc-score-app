import { expect } from 'chai';
import { classNames, mergeClassNames } from '../../src/utils/classNames';

describe('classNames', () => {
	describe('call classNames with expression that returns true', () => {
		it('should return "true"', () => {
			const data = {
				'class': true
			};

			expect(classNames(data)).to.equal('class');
		});
	});

	describe('call classNames with expression that returns false', () => {
		it('should return ""', () => {
			const data = {
				'class': false
			};

			expect(classNames(data)).to.equal('');
		});
	});

	describe('call classNames with 2 expressions that returns true', () => {
		it('should return "class-one class-two"', () => {
			const data = {
				'class-one': true,
				'class-two': true
			};

			expect(classNames(data)).to.equal('class-one class-two');
		});
	});

	describe('call classNames with 1 expression that returns true and props with one className', () => {
		it('should return class names from expression and props', () => {
			const data = {
				'one': true
			};
			const props = {
				className: 'two'
			};

			expect(classNames(data, props)).to.equal('one two');
		});
	});

	describe('call classNames with 1 expression that returns true and props with two classNames', () => {
		it('should return class names from expression and props', () => {
			const data = {
				'one': true
			};
			const props = {
				className: 'two three'
			};

			expect(classNames(data, props)).to.equal('one two three');
		});
	});

	describe('call classNames with 1 class name and props with 1 class name', () => {
		it('should return class names from string and props', () => {
			const data = 'one';
			const props = {
				className: 'two'
			};

			expect(classNames(data, props)).to.equal('one two');
		});
	});
});


describe('mergeClassNames', () => {
	describe('called with two arguments of one classname', () => {
		it('should return both arguments separated by a space', () => {
			const result = mergeClassNames('one', 'two');

			expect(result).to.equal('one two');
		});
	});

	describe('called with two arguments of two classes each', () => {
		it('should return all four classes separated by a space', () => {
			const result = mergeClassNames('one two', 'three four');

			expect(result).to.equal('one two three four');
		});
	});

	describe('called with two arguments with one unique and one shared class each', () => {
		it('should return three distinct classes separated by space', () => {
			const result = mergeClassNames('one two', 'two three');

			expect(result).to.equal('one two three');
		});
	});

	describe('called with two arguments where the second is "undefined"', () => {
		it('should return the first class', () => {
			const result = mergeClassNames('one', void 0);

			expect(result).to.equal('one');
		});
	});
});