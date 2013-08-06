describe(require('path').basename(__filename), function () {

	var chai = require('chai');
	var expect = chai.expect;
	var assert = chai.assert;

	var styles = {
		expect: {
			base: {
				"basic": function (params) {
					expect(params.actual).to.have.basename(params.expected);
					params.actual.should.have.basename(params.expected);
				},
				"with message": {msg: true, call: function (params) {
					expect(params.actual).to.have.basename(params.expected, params.msg);
					params.actual.should.have.basename(params.expected, params.msg);
				}}
			},
			negate: function (params) {
				expect(params.actual).to.not.have.basename(params.expected);
				params.actual.should.not.have.basename(params.expected);
			}
		},
		assert: {
			base: {
				"basic": function (params) {
					assert.basename(params.actual, params.expected);
				},
				"with message": {msg: true, call: function (params) {
					assert.basename(params.actual, params.expected, params.msg);
				}}
			},
			negate: function (params) {
				assert.notBasename(params.actual, params.expected);
			}
		}
	};

	var defaults = {
		actual: '/dir/sub/file.ext',
		msg: 'My Message'
	};

	var test = chai.getStyleTest(styles, defaults);

	test.valid({
		expected: 'file.ext',
		report: "expected '<%= actual %>' not to have basename '<%= expected %>' but got 'file.ext'"
	});
	test.invalid({
		expected: 'foobar.ext',
		report: "expected '<%= actual %>' to have basename '<%= expected %>' but got 'file.ext'"
	});
	test.error({
		label: 'bad actual type',
		actual: 123,
		report: "actual-value: expected <%= actual %> to be a string"
	});
	test.error({
		label: 'bad expected type',
		expected: 123,
		report: "expected-value: expected <%= expected %> to be a string"
	});
});
