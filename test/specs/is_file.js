describe(require('path').basename(__filename), function () {

	var chai = require('chai');
	var expect = chai.expect;
	var assert = chai.assert;

	var styles = {
		"expect/should": {
			base: {
				"basic": function (params) {
					expect(params.actual).to.be.a.file();
					params.actual.should.be.a.file();
				},
				"with message": {msg: true, call: function (params) {
					expect(params.actual).to.be.a.file(params.msg);
					params.actual.should.be.a.file(params.msg);
				}}
			},
			negate: function (params) {
				expect(params.actual).to.not.be.a.file();
				params.actual.should.not.be.a.file();

			}
		},
		assert: {
			base: {
				"basic": function (params) {
					assert.pathIsFile(params.actual);
				},
				"with message": {msg: true, call: function (params) {
					assert.pathIsFile(params.actual, params.msg);
				}}
			},
			negate: function (params) {
				assert.notPathIsFile(params.actual);
			}
		}
	};

	var defaults = {
		msg: 'My Message'
	};

	var test = chai.getStyleTest(styles, defaults);

	test.valid({
		actual: 'test/fixtures/alpha.txt',
		report: "expected '<%= actual %>' not to be a file"
	});
	test.invalid({
		label: 'directory',
		actual: 'test/fixtures/dir',
		report: "expected '<%= actual %>' to be a file"
	});
	test.error({
		label: 'non-existing path',
		actual: 'test/fixtures/non-existing.txt',
		report: "actual-value: expected '<%= actual %>' to exist"
	});
	test.error({
		label: 'bad actual type',
		actual: 123,
		report: "actual-value: expected <%= actual %> to be a string"
	});
});
