describe(require('path').basename(__filename), function () {
	/* jshint -W030 */

	var chai = require('chai');
	var expect = chai.expect;
	var assert = chai.assert;

	var styles = {
		"expect/should": {
			base: {
				"basic": function (params) {
					expect(params.value).to.be.a.directory().and.empty;
					params.value.should.be.a.directory().and.empty;
				},
				"with message": {msg: true, call: function (params) {
					expect(params.value).to.be.a.directory(params.msg).and.empty;
					params.value.should.be.a.directory(params.msg).and.empty;
				}}
			},
			negate: function (params) {
				expect(params.value).to.be.a.directory().and.not.empty;
				params.value.should.be.a.directory().and.not.empty;
			}
		},
		assert: {
			base: {
				"basic": function (params) {
					assert.isEmptyDirectory(params.value);
				},
				"with message": {msg: true, call: function (params) {
					assert.isEmptyDirectory(params.value, params.msg);
				}}
			},
			negate: {
				"basic": function (params) {
					assert.notIsEmptyDirectory(params.value);
				},
				"with message": {msg: true, call: function (params) {
					assert.notIsEmptyDirectory(params.value, params.msg);
				}}
			}
		}
	};

	var defaults = {
		msg: 'My Message'
	};

	var test = chai.getStyleTest(styles, defaults);

	test.valid({
		value: 'test/fixtures/empty',
		report: "expected '<%= value %>' not to be an empty directory"
	});
	test.invalid({
		label: 'directory',
		value: 'test/fixtures/dir',
		report: "expected '<%= value %>' to be an empty directory"
	});

	test.error({
		label: 'non-existing path',
		value: 'test/fixtures/non-existing',
		report: "value: expected '<%= value %>' to exist"
	});
	test.error({
		label: 'path to file',
		value: 'test/fixtures/alpha.txt',
		report: "expected '<%= value %>' to be a directory"
	});
	test.error({
		label: 'bad value type',
		value: 123,
		report: "value: expected <%= value %> to be a string"
	});
});
