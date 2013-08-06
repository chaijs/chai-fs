describe(require('path').basename(__filename), function () {
	/* jshint -W030 */

	var chai = require('chai');
	var expect = chai.expect;
	var assert = chai.assert;

	var styles = {
		"expect/should": {
			base: {
				"basic": function (params) {
					expect(params.value).to.be.a.file().and.empty;
					params.value.should.be.a.file().and.empty;
				},
				"with message": {msg: true, call: function (params) {
					expect(params.value).to.be.a.file(params.msg).and.empty;
					params.value.should.be.a.file(params.msg).and.empty;
				}}
			},
			negate: function (params) {
				expect(params.value).to.be.a.file().and.not.empty;
				params.value.should.be.a.file().and.not.empty;
			}
		},
		assert: {
			base: {
				"basic": function (params) {
					assert.isEmptyFile(params.value);
				},
				"with message": {msg: true, call: function (params) {
					assert.isEmptyFile(params.value, params.msg);
				}}
			},
			negate: {
				"basic": function (params) {
					assert.notIsEmptyFile(params.value);
				},
				"with message": {msg: true, call: function (params) {
					assert.notIsEmptyFile(params.value, params.msg);
				}}
			}
		}
	};

	var defaults = {
		msg: 'My Message'
	};

	var test = chai.getStyleTest(styles, defaults);

	test.valid({
		value: 'test/fixtures/empty.txt',
		report: "expected '<%= value %>' not to be an empty file"
	});
	test.invalid({
		label: 'file',
		value: 'test/fixtures/alpha.txt',
		report: "expected '<%= value %>' to be an empty file"
	});

	test.error({
		label: 'non-existing path',
		value: 'test/fixtures/non-existing',
		report: "value: expected '<%= value %>' to exist"
	});
	test.error({
		label: 'path to directory',
		value: 'test/fixtures/dir',
		report: "expected '<%= value %>' to be a file"
	});
	test.error({
		label: 'bad value type',
		value: 123,
		report: "value: expected <%= value %> to be a string"
	});
});
