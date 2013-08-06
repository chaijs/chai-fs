describe(require('path').basename(__filename), function () {

	var chai = require('chai');
	var expect = chai.expect;
	var assert = chai.assert;

	var styles = {
		"expect/should": {
			base: {
				"basic": function (params) {
					expect(params.value).to.be.a.directory();
					params.value.should.be.a.directory();
				},
				"with message": {msg: true, call: function (params) {
					expect(params.value).to.be.a.directory(params.msg);
					params.value.should.be.a.directory(params.msg);
				}}
			},
			negate: function (params) {
				expect(params.value).to.not.be.a.directory();
				params.value.should.not.be.a.directory();

			}
		},
		assert: {
			base: {
				"basic": function (params) {
					assert.pathIsDirectory(params.value);
				},
				"with message": {msg: true, call: function (params) {
					assert.pathIsDirectory(params.value, params.msg);
				}}
			},
			negate: {
				"basic": function (params) {
					assert.notPathIsDirectory(params.value);
				},
				"with message": {msg: true, call: function (params) {
					assert.notPathIsDirectory(params.value, params.msg);
				}}
			}
		}
	};

	var defaults = {
		msg: 'My Message'
	};

	var test = chai.getStyleTest(styles, defaults);

	test.valid({
		value: 'test/fixtures/dir',
		report: "expected '<%= value %>' not to be a directory"
	});
	test.invalid({
		label: 'directory',
		value: 'test/fixtures/alpha.txt',
		report: "expected '<%= value %>' to be a directory"
	});
	test.error({
		label: 'non-existing path',
		value: 'test/fixtures/non-existing.txt',
		report: "value: expected '<%= value %>' to exist"
	});
	test.error({
		label: 'bad value type',
		value: 123,
		report: "value: expected <%= value %> to be a string"
	});
});
