describe('extname', function () {

	var chai = require('chai');
	var expect = chai.expect;
	var assert = chai.assert;

	var actual = '/dir/sub/file.ext';
	var expectMsg = 'My Message';

	describe('valid expectation', function () {
		var expected = '.ext';

		describe('pass', function () {
			it('expect / should', function () {
				expect(actual).to.have.extname(expected, expectMsg);
				actual.should.have.extname(expected, expectMsg);
			});
			it('assert', function () {
				assert.extname(actual, expected, expectMsg);
			});
		});
		describe('fail negation', function () {
			var report = "My Message: expected '" + actual + "' not to have extname '" + expected + "' but got '.ext'";

			it('expect.not / should.not', function () {
				expect(function () {
					expect(actual).to.not.have.extname(expected, expectMsg);

				}).to.fail(report);
				expect(function () {
					actual.should.not.have.extname(expected, expectMsg);

				}).to.fail(report);
			});
			it('assert.not', function () {
				expect(function () {
					assert.notExtname(actual, expected, expectMsg);

				}).to.fail(report);
			});
		});
	});
	describe('invalid expectation', function () {
		var expected = '.bar';

		describe('fail', function () {
			var report = "My Message: expected '" + actual + "' to have extname '" + expected + "' but got '.ext'";

			it('expect / should', function () {
				expect(function () {
					expect(actual).to.have.extname(expected, expectMsg);

				}).to.fail(report);
				expect(function () {
					actual.should.have.extname(expected, expectMsg);

				}).to.fail(report);
			});
			it('assert', function () {
				expect(function () {
					assert.extname(actual, expected, expectMsg);

				}).to.fail(report);
			});
		});
		describe('pass negation', function () {
			it('expect.not / should.not', function () {
				expect(actual).to.not.have.extname(expected, expectMsg);
				actual.should.not.have.extname(expected, expectMsg);
			});
			it('assert.not', function () {
				assert.notExtname(actual, expected, expectMsg);
			});
		});
	});
});
