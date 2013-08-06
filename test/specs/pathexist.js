describe(require('path').basename(__filename), function () {

	var chai = require('chai');
	var expect = chai.expect;
	var assert = chai.assert;

	var styles = {
		"expect / should": {
			base: {
				"basic": function (params) {
					expect(params.actual).to.be.a.path();
					params.actual.should.be.a.path();
				},
				"with message": {msg: true, call: function (params) {
					expect(params.actual).to.be.a.path(params.msg);
					params.actual.should.be.a.path(params.msg);
				}}
			},
			negate: function (params) {
				expect(params.actual).to.not.be.a.path();
				params.actual.should.not.be.a.path();

			}
		},
		assert: {
			base: {
				"basic": function (params) {
					assert.pathExists(params.actual);
				},
				"with message": {msg: true, call: function (params) {
					assert.pathExists(params.actual, params.msg);
				}}
			},
			negate: function (params) {
				assert.notPathExists(params.actual);
			}
		}
	};

	var defaults = {
		actual: 'test/fixtures/alpha.txt',
		msg: 'My Message'
	};

	var test = chai.getStyleTest(styles, defaults);

	test.valid({
		report: "expected '<%= actual %>' not to exist"
	});
	test.invalid({
		actual: 'test/fixtures/non-existing.txt',
		report: "expected '<%= actual %>' to exist"
	});
});
