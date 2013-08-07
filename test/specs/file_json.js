describe(require('path').basename(__filename), function () {
	/* jshint -W030 */

	var chai = require('chai');
	var expect = chai.expect;
	var assert = chai.assert;

	var styles = {
		"expect/should": {
			base: {
				"basic": function (params) {
					expect(params.value).to.be.a.file().with.json;
					params.value.should.be.a.file().with.json;
				},
				"with message": {msg: true, call: function (params) {
					expect(params.value).to.be.a.file(params.msg).with.json;
					params.value.should.be.a.file(params.msg).with.json;
				}}
			},
			negate: function (params) {
				expect(params.value).to.be.a.file().with.not.json;
				params.value.should.be.a.file().with.not.json;
			}
		},
		assert: {
			base: {
				"basic": function (params) {
					assert.jsonFile(params.value);
				},
				"with message": {msg: true, call: function (params) {
					assert.jsonFile(params.value, params.msg);
				}}
			},
			negate: {
				"basic": function (params) {
					assert.notJsonFile(params.value);
				},
				"with message": {msg: true, call: function (params) {
					assert.notJsonFile(params.value, params.msg);
				}}
			}
		}
	};

	var defaults = {
		msg: 'My Message'
	};

	var test = chai.getStyleTest(styles, defaults);

	test.valid({
		value: 'test/fixtures/alpha.json',
		report: "expected '<%= value %>' not to be an json file"
	});
	test.invalid({
		label: 'not json',
		value: 'test/fixtures/alpha.txt',
		report: "expected '<%= value %>' to be an json file"
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
