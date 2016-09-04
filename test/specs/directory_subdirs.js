describe(require('path').basename(__filename), function () {

	var chai = require('chai');
	var expect = chai.expect;
	var assert = chai.assert;

	var styles = {
		"expect/should": {
			base: {
				"basic": function (params) {
					if (params.contains && params.deep) {
						expect(params.value).to.be.a.directory().and.contain.deep.subDirs(params.expected);
						params.value.should.be.a.directory().and.contain.deep.subDirs(params.expected);
						expect(params.value).to.be.a.directory().and.deep.content.contains.members(params.expected);
					}
					else if (params.contains) {
						expect(params.value).to.be.a.directory().and.contain.subDirs(params.expected);
						params.value.should.be.a.directory().and.contain.subDirs(params.expected);
						params.value.should.be.a.directory().and.content.contains.members(params.expected);
					}
					else if (params.deep) {
						expect(params.value).to.be.a.directory().with.deep.subDirs(params.expected);
						params.value.should.be.a.directory().with.deep.subDirs(params.expected);
						expect(params.value).to.be.a.directory().with.deep.subDirs.that.have.members(params.expected);
					}
					else {
						expect(params.value).to.be.a.directory().with.subDirs(params.expected);
						params.value.should.be.a.directory().with.subDirs(params.expected);
						expect(params.value).to.be.a.directory().with.subDirs.that.have.members(params.expected);
					}

					// Test chaining with normal array assertions
					expect(params.value).to.be.a.directory().and.content.is.an('array');
					expect(params.value).to.be.a.directory().and.subDirs.satisfy(function(subdirs) {
						return subdirs.every(function(item) {
							return typeof item === 'string';
						});
					});
				},
				"with message": {msg: true, call: function (params) {
					if (params.contains && params.deep) {
						expect(params.value).to.be.a.directory(params.msg).and.contain.deep.subDirs(params.expected, params.msg);
						params.value.should.be.a.directory(params.msg).and.contain.deep.subDirs(params.expected, params.msg);
					}
					else if (params.contains) {
						expect(params.value).to.be.a.directory(params.msg).and.contain.subDirs(params.expected, params.msg);
						params.value.should.be.a.directory(params.msg).and.contain.subDirs(params.expected, params.msg);
					}
					else if (params.deep) {
						expect(params.value).to.be.a.directory(params.msg).with.deep.subDirs(params.expected, params.msg);
						params.value.should.be.a.directory(params.msg).with.deep.subDirs(params.expected, params.msg);
					}
					else {
						expect(params.value).to.be.a.directory(params.msg).with.subDirs(params.expected, params.msg);
						params.value.should.be.a.directory(params.msg).with.subDirs(params.expected, params.msg);
					}
				}},
			},
			negate: {
				"basic": function (params) {
					if (params.contains && params.deep) {
						expect(params.value).to.be.a.directory().and.not.contain.deep.subDirs(params.expected);
						params.value.should.be.a.directory().and.not.contain.deep.subDirs(params.expected);
					}
					else if (params.contains) {
						expect(params.value).to.be.a.directory().and.not.contain.subDirs(params.expected);
						params.value.should.be.a.directory().and.not.contain.subDirs(params.expected);
					}
					else if (params.deep) {
						expect(params.value).to.be.a.directory().and.not.have.deep.subDirs(params.expected);
						params.value.should.be.a.directory().and.not.have.deep.subDirs(params.expected);
					}
					else {
						expect(params.value).to.be.a.directory().and.not.have.subDirs(params.expected);
						params.value.should.be.a.directory().and.not.have.subDirs(params.expected);
					}

					// Test chaining with normal array assertions
					params.value.should.be.a.directory().and.subDirs.is.not.a('string');
					params.value.should.be.a.directory().and.deep.subDirs.not.have.lengthOf(999);
					params.value.should.be.a.directory().and.subDirs.not.contain('does-not-exist.txt');
					params.value.should.be.a.directory().and.subDirs.not.satisfy(function(subdirs) {
						return subdirs.indexOf('does-not-exist.txt') >= 0;
					});
				},
				"with message": {msg: true, call: function (params) {
					if (params.contains && params.deep) {
						expect(params.value).to.be.a.directory(params.msg).and.not.contain.deep.subDirs(params.expected, params.msg);
						params.value.should.be.a.directory(params.msg).and.not.contain.deep.subDirs(params.expected, params.msg);
					}
					else if (params.contains) {
						expect(params.value).to.be.a.directory(params.msg).and.not.contain.subDirs(params.expected, params.msg);
						params.value.should.be.a.directory(params.msg).and.not.contain.subDirs(params.expected, params.msg);
					}
					else if (params.deep) {
						expect(params.value).to.be.a.directory(params.msg).and.not.have.deep.subDirs(params.expected, params.msg);
						params.value.should.be.a.directory(params.msg).and.not.have.deep.subDirs(params.expected, params.msg);
					}
					else {
						expect(params.value).to.be.a.directory(params.msg).and.not.have.subDirs(params.expected, params.msg);
						params.value.should.be.a.directory(params.msg).and.not.have.subDirs(params.expected, params.msg);
					}
				}}
			}
		},
		assert: {
			base: {
				"basic": function (params) {
					if (params.contains && params.deep) {
						assert.directoryDeepIncludeSubDirs(params.value, params.expected);
					}
					else if (params.contains) {
						assert.directoryIncludeSubDirs(params.value, params.expected);
					}
					else if (params.deep) {
						assert.directoryDeepSubDirs(params.value, params.expected);
					}
					else {
						assert.directorySubDirs(params.value, params.expected);
					}
				},
				"with message": {msg: true, call: function (params) {
					if (params.contains && params.deep) {
						assert.directoryDeepIncludeSubDirs(params.value, params.expected, params.msg);
					}
					else if (params.contains) {
						assert.directoryIncludeSubDirs(params.value, params.expected, params.msg);
					}
					else if (params.deep) {
						assert.directoryDeepSubDirs(params.value, params.expected, params.msg);
					}
					else {
						assert.directorySubDirs(params.value, params.expected, params.msg);
					}
				}}
			},
			negate: {
				"basic": function (params) {
					if (params.contains && params.deep) {
						assert.notDirectoryDeepIncludeSubDirs(params.value, params.expected);
					}
					else if (params.contains) {
						assert.notDirectoryIncludeSubDirs(params.value, params.expected);
					}
					else if (params.deep) {
						assert.notDirectoryDeepSubDirs(params.value, params.expected);
					}
					else {
						assert.notDirectorySubDirs(params.value, params.expected);
					}
				},
				"with message": {msg: true, call: function (params) {
					if (params.contains && params.deep) {
						assert.notDirectoryDeepIncludeSubDirs(params.value, params.expected, params.msg);
					}
					else if (params.contains) {
						assert.notDirectoryIncludeSubDirs(params.value, params.expected, params.msg);
					}
					else if (params.deep) {
						assert.notDirectoryDeepSubDirs(params.value, params.expected, params.msg);
					}
					else {
						assert.notDirectorySubDirs(params.value, params.expected, params.msg);
					}
				}}
			}
		}
	};

	var SHALLOW_SUBDIRS = ['empty', 'dir', 'dir-copy'];
	var DEEP_SUBDIRS = [
		'empty',
		'dir',
		'dir/.dotdir',
		'dir/.dotdir/empty',
		'dir-copy',
		'dir-copy/.dotdir',
		'dir-copy/.dotdir/empty'
	];

	var test = chai.getStyleTest(styles, {msg: 'My Message', chain: true});

	test.valid({
		label: 'shallow',
		value: 'test/fixtures',
		expected: SHALLOW_SUBDIRS,
		report: "expected '<%= value %>' to not have the same sub-directories as [ 'dir', 'dir-copy', 'empty' ]"
	});
	test.valid({
		label: 'deep',
		deep: true,
		value: 'test/fixtures',
		expected: DEEP_SUBDIRS,
		length: DEEP_SUBDIRS.length,
		report: "expected '<%= value %>' to not have the same deep sub-directories as [ Array(<%= length %>) ]"
	});
	test.valid({
		label: 'shallow, subset',
		contains: true,
		value: 'test/fixtures',
		expected: ['empty'],
		report: "expected '<%= value %>' to not contain sub-directories [ 'empty' ]"
	});
	test.valid({
		label: 'deep, subset',
		deep: true,
		contains: true,
		value: 'test/fixtures',
		expected: ['dir/.dotdir', 'empty'],
		report: "expected '<%= value %>' to not contain deep sub-directories [ 'dir/.dotdir', 'empty' ]"
	});

	test.invalid({
		label: 'empty',
		value: 'test/fixtures',
		expected: [],
		report: "expected '<%= value %>' to have the same sub-directories as []"
	});
	test.invalid({
		label: 'shallow',
		value: 'test/fixtures',
		expected: ['dir'],
		report: "expected '<%= value %>' to have the same sub-directories as [ 'dir' ]"
	});
	test.invalid({
		label: 'deep',
		deep: true,
		value: 'test/fixtures',
		expected: ['empty', 'dir/.dotdir'],
		report: "expected '<%= value %>' to have the same deep sub-directories as [ 'dir/.dotdir', 'empty' ]"
	});
	test.invalid({
		label: 'shallow, subset',
		contains: true,
		value: 'test/fixtures',
		expected: ['empty/not-empty'],
		report: "expected '<%= value %>' to contain sub-directories [ 'empty/not-empty' ]"
	});
	test.invalid({
		label: 'deep, subset',
		deep: true,
		contains: true,
		value: 'test/fixtures',
		expected: ['dir/.dotdir/empty/not-empty', 'dir'],
		report: "expected '<%= value %>' to contain deep sub-directories [ Array(2) ]"
	});

	test.error({
		label: 'not a directory',
		value: 'test/fixtures/alpha.json',
		report: "expected '<%= value %>' to be a directory"
	});
	test.error({
		label: 'non-existing path',
		value: 'test/fixtures/non-existing',
		report: "value: expected '<%= value %>' to exist"
	});
	test.error({
		label: 'bad value type',
		value: 123,
		report: "value: expected <%= value %> to be a string"
	});
	test.error({
		label: 'bad expected type',
		value: 'test/fixtures',
		expected: 123,
		report: "expected-value: expected <%= expected %> to be an array"
	});
});