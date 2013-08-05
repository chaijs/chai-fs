describe(require('path').basename(__filename), function () {

	var chai = require('chai');
	var expect = chai.expect;
	var assert = chai.assert;

	var styles = {
		expect: {
			base: {
				"basic": function (params) {
					expect(params.actual).to.have.extname(params.expected);
					params.actual.should.have.extname(params.expected);
				},
				"with message": {msg: true, call: function (params) {
					expect(params.actual).to.have.extname(params.expected, params.msg);
					params.actual.should.have.extname(params.expected, params.msg);
				}}
			},
			negate: function (params) {
				expect(params.actual).to.not.have.extname(params.expected);
				params.actual.should.not.have.extname(params.expected);
			}
		},
		assert: {
			base: {
				"basic": function (params) {
					assert.extname(params.actual, params.expected);
				},
				"with message": {msg: true, call: function (params) {
					assert.extname(params.actual, params.expected, params.msg);
				}}
			},
			negate: function (params) {
				assert.notExtname(params.actual, params.expected);
			}
		}
	};

	var defaults = {
		actual: '/dir/sub/file.ext',
		msg: 'My Message'
	};

	var test = chai.getStyleTest(styles, defaults);

	test.valid({
		expected: '.ext',
		report: "expected '<%= actual %>' not to have extname '<%= expected %>' but got '.ext'"
	});
	test.invalid({
		expected: '.bar',
		report: "expected '<%= actual %>' to have extname '<%= expected %>' but got '.ext'"
	});
});
