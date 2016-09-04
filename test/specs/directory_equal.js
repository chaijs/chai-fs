describe(require('path').basename(__filename), function () {

	var chai = require('chai');
	var expect = chai.expect;
	var assert = chai.assert;

	var styles = {
		"expect/should": {
			base: {
				"basic": function (params) {
					if (params.deep) {
						expect(params.value).to.be.a.directory().and.deep.equal(params.expected);
						params.value.should.be.a.directory().and.deep.equal(params.expected);
					}
					else {
						expect(params.value).to.be.a.directory().and.equal(params.expected);
						params.value.should.be.a.directory().and.equal(params.expected);
					}
				},
				"with message": {msg: true, call: function (params) {
					if (params.deep) {
						expect(params.value).to.be.a.directory(params.msg).and.deep.equal(params.expected, params.msg);
						params.value.should.be.a.directory(params.msg).and.deep.equal(params.expected, params.msg);
					}
					else {
						expect(params.value).to.be.a.directory(params.msg).and.equal(params.expected, params.msg);
						params.value.should.be.a.directory(params.msg).and.equal(params.expected, params.msg);
					}
				}}
			},
			negate: {
				"basic": function (params) {
					if (params.deep) {
						expect(params.value).to.be.a.directory().and.not.deep.equal(params.expected);
						params.value.should.be.a.directory().and.not.deep.equal(params.expected);
					}
					else {
						expect(params.value).to.be.a.directory().and.not.equal(params.expected);
						params.value.should.be.a.directory().and.not.equal(params.expected);
					}
				},
				"with message": {msg: true, call: function (params) {
					if (params.deep) {
						expect(params.value).to.be.a.directory(params.msg).and.not.deep.equal(params.expected, params.msg);
						params.value.should.be.a.directory(params.msg).and.not.deep.equal(params.expected, params.msg);
					}
					else {
						expect(params.value).to.be.a.directory(params.msg).and.not.equal(params.expected, params.msg);
						params.value.should.be.a.directory(params.msg).and.not.equal(params.expected, params.msg);
					}
				}}
			}
		},
		assert: {
			base: {
				"basic": function (params) {
					if (params.deep) {
						assert.directoryDeepEqual(params.value, params.expected);
					}
					else {
						assert.directoryEqual(params.value, params.expected);
					}
				},
				"with message": {msg: true, call: function (params) {
					if (params.deep) {
						assert.directoryDeepEqual(params.value, params.expected, params.msg);
					}
					else {
						assert.directoryEqual(params.value, params.expected, params.msg);
					}
				}}
			},
			negate: {
				"basic": function (params) {
					if (params.deep) {
						assert.notDirectoryDeepEqual(params.value, params.expected);
					}
					else {
						assert.notDirectoryEqual(params.value, params.expected);
					}
				},
				"with message": {msg: true, call: function (params) {
					if (params.deep) {
						assert.notDirectoryDeepEqual(params.value, params.expected, params.msg);
					}
					else {
						assert.notDirectoryEqual(params.value, params.expected, params.msg);
					}
				}}
			}
		}
	};

	var test = chai.getStyleTest(styles, {msg: 'My Message'});

	test.valid({
		label: 'same directory',
		value: 'test/fixtures',
		expected: 'test/fixtures',
		report: "expected '<%= value %>' not to equal '<%= expected %>'"
	});
	test.valid({
		label: 'same directory - deep',
		deep: true,
		value: 'test/fixtures',
		expected: 'test/fixtures',
		report: "expected '<%= value %>' not to deep equal '<%= expected %>'"
	});

	test.invalid({
		label: 'different directories',
		value: 'test/fixtures',
		expected: 'test/fixtures/dir',
		report: "expected '<%= value %>' to equal '<%= expected %>'"
	});
	test.invalid({
		label: 'different directories - deep',
		deep: true,
		value: 'test/fixtures',
		expected: 'test/fixtures/dir',
		report: "expected '<%= value %>' to deep equal '<%= expected %>'"
	});

	test.valid({
		label: 'different directories, same contents',
		value: 'test/fixtures/dir',
		expected: 'test/fixtures/dir-copy',
		report: "expected '<%= value %>' not to equal '<%= expected %>'"
	});
	test.valid({
		label: 'different directories, same contents - deep',
		deep: true,
		value: 'test/fixtures/dir',
		expected: 'test/fixtures/dir-copy',
		report: "expected '<%= value %>' not to deep equal '<%= expected %>'"
	});

	test.valid({
		label: 'empty directory',
		value: 'test/fixtures/empty',
		expected: 'test/fixtures/dir/.dotdir/empty',
		report: "expected '<%= value %>' not to equal '<%= expected %>'"
	});
	test.valid({
		label: 'empty directory - deep',
		deep: true,
		value: 'test/fixtures/empty',
		expected: 'test/fixtures/dir/.dotdir/empty',
		report: "expected '<%= value %>' not to deep equal '<%= expected %>'"
	});

	test.error({
		label: 'not a directory',
		value: 'test/fixtures/alpha.txt',
		report: "expected '<%= value %>' to be a directory"
	});
	test.error({
		label: 'not a directory - deep',
		deep: true,
		value: 'test/fixtures/alpha.txt',
		report: "expected '<%= value %>' to be a directory"
	});

	test.error({
		label: 'non-existing path',
		value: 'test/fixtures/non-existing',
		report: "value: expected '<%= value %>' to exist"
	});
	test.error({
		label: 'non-existing path - deep',
		deep: true,
		value: 'test/fixtures/non-existing',
		report: "value: expected '<%= value %>' to exist"
	});

	test.error({
		label: 'bad expected type',
		value: 'test/fixtures',
		expected: 123,
		report: "expected-value: expected <%= expected %> to be a string"
	});
	test.error({
		label: 'bad expected type - deep',
		deep: true,
		value: 'test/fixtures',
		expected: 123,
		report: "expected-value: expected <%= expected %> to be a string"
	});

	test.error({
		label: 'bad value type',
		value: 123,
		report: "value: expected <%= value %> to be a string"
	});
	test.error({
		label: 'bad value type - deep',
		deep: true,
		value: 123,
		report: "value: expected <%= value %> to be a string"
	});
});
