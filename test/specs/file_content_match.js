describe(require('path').basename(__filename), function () {

	var chai = require('chai');
	var expect = chai.expect;
	var assert = chai.assert;

	var styles = {
		"expect/should": {
			base: {
				"basic": function (params) {
					expect(params.value).to.have.content_that_match(params.expected);
					params.value.should.have.content_that_match(params.expected);
				},
				"with message": {msg: true, call: function (params) {
					expect(params.value).to.have.content_that_match(params.expected, params.msg);
					params.value.should.have.content_that_match(params.expected, params.msg);
				}}
			},
			negate: function (params) {
				expect(params.value).to.not.have.content_that_match(params.expected);
				params.value.should.not.have.content_that_match(params.expected);

			}
		},
		assert: {
			base: {
				"basic": function (params) {
					assert.fileContentMatch(params.value, params.expected);
				},
				"with message": {msg: true, call: function (params) {
					assert.fileContentMatch(params.value, params.expected, params.msg);
				}}
			},
			negate: {
				"basic": function (params) {
					assert.notFileContentMatch(params.value, params.expected);
				},
				"with message": {msg: true, call: function (params) {
					assert.notFileContentMatch(params.value, params.expected, params.msg);
				}}
			}
		}
	};

	var fs = require('fs');
	var defaults = {
		msg: 'My Message',
		value: 'test/fixtures/alpha.txt',
		actual: fs.readFileSync('test/fixtures/alpha.txt', 'utf8'),
		expected: /pha F/ 
	};

	var test = chai.getStyleTest(styles, defaults);

	test.valid({
		report: "expected '<%= value %>' not to have content that match <%= expected %>"
	});
	test.invalid({
		expected: /^baracuda/,
		report: "expected '<%= value %>' to have content that match <%= expected %> but got '<%= actual %>'"
	});

	test.error({
		label: 'not a file',
		value: 'test/fixtures/dir',
		report: "value: expected '<%= value %>' to be a file"
	});
	test.error({
		label: 'non-existing path',
		value: 'test/fixtures/non-existing.txt',
		report: "value: expected '<%= value %>' to exist"
	});
	test.error({
		label: 'bad expected type',
		expected: 123,
		report: "expected-value: expected <%= expected %> to be an instance of RegExp"
	});
	test.error({
		label: 'bad value type',
		value: 123,
		report: "value: expected <%= value %> to be a string"
	});
});
