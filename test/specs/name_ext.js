describe(require('path').basename(__filename), function () {

	var chai = require('chai');
	var expect = chai.expect;
	var assert = chai.assert;

	var styles = {
		"expect/should": {
			base: {
				"basic": function (params) {
					expect(params.value).to.have.extname(params.expected);
					params.value.should.have.extname(params.expected);
				},
				"with message": {msg: true, call: function (params) {
					expect(params.value).to.have.extname(params.expected, params.msg);
					params.value.should.have.extname(params.expected, params.msg);
				}}
			},
			negate: function (params) {
				expect(params.value).to.not.have.extname(params.expected);
				params.value.should.not.have.extname(params.expected);
			}
		},
		assert: {
			base: {
				"basic": function (params) {
					assert.extname(params.value, params.expected);
				},
				"with message": {msg: true, call: function (params) {
					assert.extname(params.value, params.expected, params.msg);
				}}
			},
			negate: {
				"basic": function (params) {
					assert.notExtname(params.value, params.expected);
				},
				"with message": {msg: true, call: function (params) {
					assert.notExtname(params.value, params.expected, params.msg);
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
		expected: '.ext',
		report: "expected '<%= value %>' not to have extname '<%= expected %>' but got '.ext'"
	});
	test.invalid({
		expected: '.bar',
		report: "expected '<%= value %>' to have extname '<%= expected %>' but got '.ext'"
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
