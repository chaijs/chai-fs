describe('path', function () {

	var chai = require('chai');
	var expect = chai.expect;
	var assert = chai.assert;

	var actual = '/dir/sub/file.ext';
	var expectMsg = 'My Message';

	describe('basename', function () {

		describe('valid data', function () {
			var expected = 'file.ext';
			var report = "My Message: expected '/dir/sub/file.ext' not to have basename 'file.ext' but got 'file.ext'";

			describe('pass', function () {
				it('expect / should', function () {
					expect(actual).to.have.basename(expected, expectMsg);
					actual.should.have.basename(expected, expectMsg);
				});
				it('assert', function () {
					assert.basename(actual, expected, expectMsg);
				});
			});
			describe('fail negation', function () {

				it('expect.not / should.not', function () {
					expect(function () {
						expect(actual).to.not.have.basename(expected, expectMsg);

					}).to.fail(report);
					expect(function () {
						actual.should.not.have.basename(expected, expectMsg);

					}).to.fail(report);
				});
				it('assert.not', function () {
					expect(function () {
						assert.notBasename(actual, expected, expectMsg);

					}).to.fail(report);
				});
			});
		});
		describe('invalid data', function () {
			var expected = 'foobar.ext';
			var report = "My Message: expected '/dir/sub/file.ext' to have basename 'foobar.ext' but got 'file.ext'";

			describe('fail', function () {
				it('expect / should', function () {
					expect(function () {
						expect(actual).to.have.basename(expected, expectMsg);

					}).to.fail(report);
					expect(function () {
						actual.should.have.basename(expected, expectMsg);

					}).to.fail(report);
				});
				it('assert', function () {
					expect(function () {
						assert.basename(actual, expected, expectMsg);

					}).to.fail(report);
				});
			});
			describe('pass negation', function () {
				it('expect.not / should.not', function () {
					expect(actual).to.not.have.basename(expected, expectMsg);
					actual.should.not.have.basename(expected, expectMsg);
				});
				it('assert.not', function () {
					assert.notBasename(actual, expected, expectMsg);
				});
			});
		});
	});
	/*
			describe('pathname', function () {
				it('pass', function () {
					var actual = '/dir/sub/file.ext';
					var expected = 'file.ext';

					expect(actual).to.have.basename(expected, 'expect');
					actual.should.have.basename(expected, 'should');
					assert.basename(actual, expected, 'assert');
				});
				it('fail', function () {
					var actual = '/dir/sub/file.ext';
					var expected = 'file.ext';
					var message = "expected '/dir/sub/file.ext' not to have basename 'file.ext' but got 'file.ext'";

					expect(function () {
						expect(actual).to.not.have.basename(expected);

					}).to.fail(message, 'expect');

					expect(function () {
						actual.should.not.have.basename(expected);

					}).to.fail(message, 'should');

					expect(function () {
						assert.notBasename(actual, expected);

					}).to.fail(message, 'assert');
				});
			});*/
});
