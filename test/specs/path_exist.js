describe(require('path').basename(__filename), function () {

	var chai = require('chai');
	var expect = chai.expect;
	var assert = chai.assert;

	var styles = {
		"expect/should": {
			base: {
				"basic": function (params) {
					expect(params.value).to.be.a.path();
					params.value.should.be.a.path();
				},
				"with message": {msg: true, call: function (params) {
					expect(params.value).to.be.a.path(params.msg);
					params.value.should.be.a.path(params.msg);
				}}
			},
			negate: function (params) {
				expect(params.value).to.not.be.a.path();
				params.value.should.not.be.a.path();

			}
		},
		assert: {
			base: {
				"basic": function (params) {
					assert.pathExists(params.value);
				},
				"with message": {msg: true, call: function (params) {
					assert.pathExists(params.value, params.msg);
				}}
			},
			negate: {
				"basic": function (params) {
					assert.notPathExists(params.value);
				},
				"with message": {msg: true, call: function (params) {
					assert.notPathExists(params.value, params.msg);
				}}
			}
		}
	};

	var defaults = {
		msg: 'My Message'
	};

	var test = chai.getStyleTest(styles, defaults);

	test.valid({
		value: 'test/fixtures/alpha.txt',
		report: "expected '<%= value %>' not to exist"
	});
	test.invalid({
		value: 'test/fixtures/non-existing.txt',
		report: "expected '<%= value %>' to exist"
	});
	test.error({
		label: 'bad value type',
		value: 123,
		report: "value: expected <%= value %> to be a string"
	});
});
