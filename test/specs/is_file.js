describe(require('path').basename(__filename), function () {

	var chai = require('chai');
	var expect = chai.expect;
	var assert = chai.assert;

	var styles = {
		"expect/should": {
			base: {
				"basic": function (params) {
					expect(params.value).to.be.a.file();
					params.value.should.be.a.file();
				},
				"with message": {msg: true, call: function (params) {
					expect(params.value).to.be.a.file(params.msg);
					params.value.should.be.a.file(params.msg);
				}}
			},
			negate: function (params) {
				expect(params.value).to.not.be.a.file();
				params.value.should.not.be.a.file();

			}
		},
		assert: {
			base: {
				"basic": function (params) {
					assert.pathIsFile(params.value);
				},
				"with message": {msg: true, call: function (params) {
					assert.pathIsFile(params.value, params.msg);
				}}
			},
			negate: {
				"basic": function (params) {
					assert.notPathIsFile(params.value);
				},
				"with message": {msg: true, call: function (params) {
					assert.notPathIsFile(params.value, params.msg);
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
		report: "expected '<%= value %>' not to be a file"
	});
	test.invalid({
		label: 'directory',
		value: 'test/fixtures/dir',
		report: "expected '<%= value %>' to be a file"
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
