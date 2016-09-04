describe(require('path').basename(__filename), function () {

	var fs = require('fs');
	var chai = require('chai');
	var expect = chai.expect;
	var assert = chai.assert;

	var styles = {
		"expect/should": {
			base: {
				"basic": function (params) {
					if (params.contains && params.deep) {
						expect(params.value).to.be.a.directory().and.contain.deep.files(params.expected);
						params.value.should.be.a.directory().and.contain.deep.files(params.expected);
						expect(params.value).to.be.a.directory().and.deep.content.contains.members(params.expected);
					}
					else if (params.contains) {
						expect(params.value).to.be.a.directory().and.contain.files(params.expected);
						params.value.should.be.a.directory().and.contain.files(params.expected);
						params.value.should.be.a.directory().and.content.contains.members(params.expected);
					}
					else if (params.deep) {
						expect(params.value).to.be.a.directory().with.deep.files(params.expected);
						params.value.should.be.a.directory().with.deep.files(params.expected);
						expect(params.value).to.be.a.directory().with.deep.files.that.have.members(params.expected);
					}
					else {
						expect(params.value).to.be.a.directory().with.files(params.expected);
						params.value.should.be.a.directory().with.files(params.expected);
						expect(params.value).to.be.a.directory().with.files.that.have.members(params.expected);
					}

					// Test chaining with normal array assertions
					expect(params.value).to.be.a.directory().and.content.is.an('array');
					expect(params.value).to.be.a.directory().and.files.satisfy(function(files) {
						return files.every(function(item) {
							return typeof item === 'string';
						});
					});
				},
				"with message": {msg: true, call: function (params) {
					if (params.contains && params.deep) {
						expect(params.value).to.be.a.directory(params.msg).and.contain.deep.files(params.expected, params.msg);
						params.value.should.be.a.directory(params.msg).and.contain.deep.files(params.expected, params.msg);
					}
					else if (params.contains) {
						expect(params.value).to.be.a.directory(params.msg).and.contain.files(params.expected, params.msg);
						params.value.should.be.a.directory(params.msg).and.contain.files(params.expected, params.msg);
					}
					else if (params.deep) {
						expect(params.value).to.be.a.directory(params.msg).with.deep.files(params.expected, params.msg);
						params.value.should.be.a.directory(params.msg).with.deep.files(params.expected, params.msg);
					}
					else {
						expect(params.value).to.be.a.directory(params.msg).with.files(params.expected, params.msg);
						params.value.should.be.a.directory(params.msg).with.files(params.expected, params.msg);
					}
				}},
			},
			negate: {
				"basic": function (params) {
					if (params.contains && params.deep) {
						expect(params.value).to.be.a.directory().and.not.contain.deep.files(params.expected);
						params.value.should.be.a.directory().and.not.contain.deep.files(params.expected);
					}
					else if (params.contains) {
						expect(params.value).to.be.a.directory().and.not.contain.files(params.expected);
						params.value.should.be.a.directory().and.not.contain.files(params.expected);
					}
					else if (params.deep) {
						expect(params.value).to.be.a.directory().and.not.have.deep.files(params.expected);
						params.value.should.be.a.directory().and.not.have.deep.files(params.expected);
					}
					else {
						expect(params.value).to.be.a.directory().and.not.have.files(params.expected);
						params.value.should.be.a.directory().and.not.have.files(params.expected);
					}

					// Test chaining with normal array assertions
					params.value.should.be.a.directory().and.files.is.not.a('string');
					params.value.should.be.a.directory().and.deep.files.not.have.lengthOf(999);
					params.value.should.be.a.directory().and.files.not.contain('does-not-exist.txt');
					params.value.should.be.a.directory().and.files.not.satisfy(function(files) {
						return files.indexOf('does-not-exist.txt') >= 0;
					});
				},
				"with message": {msg: true, call: function (params) {
					if (params.contains && params.deep) {
						expect(params.value).to.be.a.directory(params.msg).and.not.contain.deep.files(params.expected, params.msg);
						params.value.should.be.a.directory(params.msg).and.not.contain.deep.files(params.expected, params.msg);
					}
					else if (params.contains) {
						expect(params.value).to.be.a.directory(params.msg).and.not.contain.files(params.expected, params.msg);
						params.value.should.be.a.directory(params.msg).and.not.contain.files(params.expected, params.msg);
					}
					else if (params.deep) {
						expect(params.value).to.be.a.directory(params.msg).and.not.have.deep.files(params.expected, params.msg);
						params.value.should.be.a.directory(params.msg).and.not.have.deep.files(params.expected, params.msg);
					}
					else {
						expect(params.value).to.be.a.directory(params.msg).and.not.have.files(params.expected, params.msg);
						params.value.should.be.a.directory(params.msg).and.not.have.files(params.expected, params.msg);
					}
				}}
			}
		},
		assert: {
			base: {
				"basic": function (params) {
					if (params.contains && params.deep) {
						assert.directoryDeepIncludeFiles(params.value, params.expected);
					}
					else if (params.contains) {
						assert.directoryIncludeFiles(params.value, params.expected);
					}
					else if (params.deep) {
						assert.directoryDeepFiles(params.value, params.expected);
					}
					else {
						assert.directoryFiles(params.value, params.expected);
					}
				},
				"with message": {msg: true, call: function (params) {
					if (params.contains && params.deep) {
						assert.directoryDeepIncludeFiles(params.value, params.expected, params.msg);
					}
					else if (params.contains) {
						assert.directoryIncludeFiles(params.value, params.expected, params.msg);
					}
					else if (params.deep) {
						assert.directoryDeepFiles(params.value, params.expected, params.msg);
					}
					else {
						assert.directoryFiles(params.value, params.expected, params.msg);
					}
				}}
			},
			negate: {
				"basic": function (params) {
					if (params.contains && params.deep) {
						assert.notDirectoryDeepIncludeFiles(params.value, params.expected);
					}
					else if (params.contains) {
						assert.notDirectoryIncludeFiles(params.value, params.expected);
					}
					else if (params.deep) {
						assert.notDirectoryDeepFiles(params.value, params.expected);
					}
					else {
						assert.notDirectoryFiles(params.value, params.expected);
					}
				},
				"with message": {msg: true, call: function (params) {
					if (params.contains && params.deep) {
						assert.notDirectoryDeepIncludeFiles(params.value, params.expected, params.msg);
					}
					else if (params.contains) {
						assert.notDirectoryIncludeFiles(params.value, params.expected, params.msg);
					}
					else if (params.deep) {
						assert.notDirectoryDeepFiles(params.value, params.expected, params.msg);
					}
					else {
						assert.notDirectoryFiles(params.value, params.expected, params.msg);
					}
				}}
			}
		}
	};

	var SHALLOW_FILES = fs.readdirSync('test/fixtures');
	SHALLOW_FILES.splice(SHALLOW_FILES.indexOf('dir'), 1);
	SHALLOW_FILES.splice(SHALLOW_FILES.indexOf('dir-copy'), 1);
	SHALLOW_FILES.splice(SHALLOW_FILES.indexOf('empty'), 1);
	SHALLOW_FILES.splice(SHALLOW_FILES.indexOf('broken-symlink.txt'), 1);

	var DEEP_FILES = SHALLOW_FILES.slice();
	DEEP_FILES.push(
		'dir/beta.txt',
		'dir/.dotdir/.dotfile',
		'dir-copy/beta.txt',
		'dir-copy/.dotdir/.dotfile'
	);

	var test = chai.getStyleTest(styles, {msg: 'My Message', chain: true});

	test.valid({
		label: 'shallow',
		value: 'test/fixtures',
		expected: SHALLOW_FILES,
		length: SHALLOW_FILES.length,
		report: "expected '<%= value %>' to not have the same files as [ Array(<%= length %>) ]"
	});
	test.valid({
		label: 'deep',
		deep: true,
		value: 'test/fixtures',
		expected: DEEP_FILES,
		length: DEEP_FILES.length,
		report: "expected '<%= value %>' to not have the same deep files as [ Array(<%= length %>) ]"
	});
	test.valid({
		label: 'shallow, subset',
		contains: true,
		value: 'test/fixtures',
		expected: ['alpha.txt', 'symlink.txt', 'tango.json', 'empty.txt'],
		report: "expected '<%= value %>' to not contain files [ Array(4) ]"
	});
	test.valid({
		label: 'deep, subset',
		deep: true,
		contains: true,
		value: 'test/fixtures',
		expected: ['alpha.txt', 'symlink.txt', 'dir/.dotdir/.dotfile', 'dir/beta.txt'],
		report: "expected '<%= value %>' to not contain deep files [ Array(4) ]"
	});

	test.invalid({
		label: 'empty',
		value: 'test/fixtures',
		expected: [],
		report: "expected '<%= value %>' to have the same files as []"
	});
	test.invalid({
		label: 'shallow',
		value: 'test/fixtures',
		expected: ['alpha.json', 'symlink.txt'],
		report: "expected '<%= value %>' to have the same files as [ 'alpha.json', 'symlink.txt' ]"
	});
	test.invalid({
		label: 'deep',
		deep: true,
		value: 'test/fixtures',
		expected: ['empty.txt', 'dir/.dotdir/.dotfile'],
		report: "expected '<%= value %>' to have the same deep files as [ 'dir/.dotdir/.dotfile', 'empty.txt' ]"
	});
	test.invalid({
		label: 'shallow, subset',
		contains: true,
		value: 'test/fixtures',
		expected: ['does-not-exist.txt'],
		report: "expected '<%= value %>' to contain files [ 'does-not-exist.txt' ]"
	});
	test.invalid({
		label: 'deep, subset',
		deep: true,
		contains: true,
		value: 'test/fixtures',
		expected: ['dir/.dotdir/does-not-exist', 'does-not-exist.txt'],
		report: "expected '<%= value %>' to contain deep files [ Array(2) ]"
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