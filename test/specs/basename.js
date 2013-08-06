describe(require('path').basename(__filename), function () {

	var chai = require('chai');
	var expect = chai.expect;
	var assert = chai.assert;

	var styles = {
		expect: {
			base: {
				"basic": function (params) {
					expect(params.value).to.have.basename(params.expected);
					params.value.should.have.basename(params.expected);
				},
				"with message": {msg: true, call: function (params) {
					expect(params.value).to.have.basename(params.expected, params.msg);
					params.value.should.have.basename(params.expected, params.msg);
				}}
			},
			negate: function (params) {
				expect(params.value).to.not.have.basename(params.expected);
				params.value.should.not.have.basename(params.expected);
			}
		},
		assert: {
			base: {
				"basic": function (params) {
					assert.basename(params.value, params.expected);
				},
				"with message": {msg: true, call: function (params) {
					assert.basename(params.value, params.expected, params.msg);
				}}
			},
			negate: {
				"basic": function (params) {
					assert.notBasename(params.value, params.expected);
				},
				"with message": {msg: true, call: function (params) {
					assert.notBasename(params.value, params.expected, params.msg);
				}}
			}
		}
	};

	var defaults = {
		value: '/dir/sub/file.ext',
		msg: 'My Message'
	};

	var test = chai.getStyleTest(styles, defaults);

	test.valid({
		expected: 'file.ext',
		report: "expected '<%= value %>' not to have basename '<%= expected %>' but got 'file.ext'"
	});
	test.invalid({
		expected: 'foobar.ext',
		report: "expected '<%= value %>' to have basename '<%= expected %>' but got 'file.ext'"
	});
	test.error({
		label: 'bad value type',
		value: 123,
		report: "value: expected <%= value %> to be a string"
	});
	test.error({
		label: 'bad expected type',
		expected: 123,
		report: "expected-value: expected <%= expected %> to be a string"
	});
});
