describe(require('path').basename(__filename), function () {

	var chai = require('chai');
	var expect = chai.expect;
	var assert = chai.assert;

	var styles = {
		expect: {
			base: {
				"basic": function (params) {
					expect(params.actual).to.have.dirname(params.expected);
					params.actual.should.have.dirname(params.expected);
				},
				"with message": {msg: true, call: function (params) {
					expect(params.actual).to.have.dirname(params.expected, params.msg);
					params.actual.should.have.dirname(params.expected, params.msg);
				}}
			},
			negate: function (params) {
				expect(params.actual).to.not.have.dirname(params.expected);
				params.actual.should.not.have.dirname(params.expected);
			}
		},
		assert: {
			base: {
				"basic": function (params) {
					assert.dirname(params.actual, params.expected);
				},
				"with message": {msg: true, call: function (params) {
					assert.dirname(params.actual, params.expected, params.msg);
				}}
			},
			negate: function (params) {
				assert.notDirname(params.actual, params.expected);
			}
		}
	};

	var defaults = {
		actual: '/dir/sub/file.ext',
		msg: 'My Message'
	};

	var test = chai.getStyleTest(styles, defaults);

	test.valid({
		expected: '/dir/sub',
		report: "expected '<%= actual %>' not to have dirname '<%= expected %>' but got '/dir/sub'"
	});
	test.invalid({
		expected: 'foo/bar',
		report: "expected '<%= actual %>' to have dirname '<%= expected %>' but got '/dir/sub'"
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
