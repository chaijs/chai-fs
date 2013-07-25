describe('dirname', function () {

	var chai = require('chai');
	var expect = chai.expect;
	var assert = chai.assert;

	var actual = '/dir/sub/file.ext';
	var expectMsg = 'My Message';


	describe('valid expectation', function () {
		var expected = '/dir/sub';

		describe('pass', function () {
			it('expect / should', function () {
				expect(actual).to.have.dirname(expected, expectMsg);
				actual.should.have.dirname(expected, expectMsg);
			});
			it('assert', function () {
				assert.dirname(actual, expected, expectMsg);
			});
		});
		describe('fail negation', function () {
			var report = "My Message: expected '" + actual + "' not to have dirname '" + expected + "' but got '/dir/sub'";

			it('expect.not / should.not', function () {
				expect(function () {
					expect(actual).to.not.have.dirname(expected, expectMsg);

				}).to.fail(report);
				expect(function () {
					actual.should.not.have.dirname(expected, expectMsg);

				}).to.fail(report);
			});
			it('assert.not', function () {
				expect(function () {
					assert.notDirname(actual, expected, expectMsg);

				}).to.fail(report);
			});
		});
	});
	describe('invalid expectation', function () {
		var expected = 'foo/bar';

		describe('fail', function () {
			var report = "My Message: expected '" + actual + "' to have dirname '" + expected + "' but got '/dir/sub'";

			it('expect / should', function () {
				expect(function () {
					expect(actual).to.have.dirname(expected, expectMsg);

				}).to.fail(report);
				expect(function () {
					actual.should.have.dirname(expected, expectMsg);

				}).to.fail(report);
			});
			it('assert', function () {
				expect(function () {
					assert.dirname(actual, expected, expectMsg);

				}).to.fail(report);
			});
		});
		describe('pass negation', function () {
			it('expect.not / should.not', function () {
				expect(actual).to.not.have.dirname(expected, expectMsg);
				actual.should.not.have.dirname(expected, expectMsg);
			});
			it('assert.not', function () {
				assert.notDirname(actual, expected, expectMsg);
			});
		});
	});
});
