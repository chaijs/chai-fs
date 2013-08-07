describe(require('path').basename(__filename), function () {
	/* jshint -W030 */

	var chai = require('chai');
	var expect = chai.expect;
	var assert = chai.assert;

	var fs = require('fs');

	var styles = {
		"expect/should": {
			base: {
				"basic": function (params) {
					expect(params.value).to.be.a.file().using.json.schema(params.schema);
					params.value.should.be.a.file().using.json.schema(params.schema);
				},
				"with message": {msg: true, call: function (params) {
					expect(params.value).to.be.a.file(params.msg).using.json.schema(params.schema);
					params.value.should.be.a.file(params.msg).using.json.schema(params.schema);
				}}
			},
			negate: function (params) {
				expect(params.value).to.be.a.file().using.json.not.schema(params.schema);
				params.value.should.be.a.file().using.json.not.schema(params.schema);
			}
		},
		assert: {
			base: {
				"basic": function (params) {
					assert.jsonSchemaFile(params.value, params.schema);
				},
				"with message": {msg: true, call: function (params) {
					assert.jsonSchemaFile(params.value, params.schema, params.msg);
				}}
			},
			negate: {
				"basic": function (params) {
					assert.notJsonSchemaFile(params.value, params.schema);
				},
				"with message": {msg: true, call: function (params) {
					assert.notJsonSchemaFile(params.value, params.schema, params.msg);
				}}
			}
		}
	};

	var defaults = {
		msg: 'My Message',
		schema: JSON.parse(fs.readFileSync('test/fixtures/alpha-schema.json', 'utf8'))
	};

	// capture mesage
	var alphaJson = JSON.parse(fs.readFileSync('test/fixtures/alpha.json', 'utf8'));
	var alphaMessage;
	try {
		assert.notJsonSchema(alphaJson, defaults.schema);
	}
	catch (e) {
		alphaMessage = e.message;
	}

	var tangoJson = JSON.parse(fs.readFileSync('test/fixtures/tango.json', 'utf8'));
	var tangoMessage;
	try {
		assert.jsonSchema(tangoJson, defaults.schema);
	}
	catch (e) {
		tangoMessage = e.message;
	}

	var test = chai.getStyleTest(styles, defaults);

	test.valid({
		value: 'test/fixtures/alpha.json',
		report: alphaMessage
	});
	test.invalid({
		label: 'not matching schema',
		value: 'test/fixtures/tango.json',
		report: tangoMessage
	});

	test.error({
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
