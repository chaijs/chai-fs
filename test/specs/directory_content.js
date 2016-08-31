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
						expect(params.value).to.be.a.directory().and.contain.deep.contents(params.expected);
						params.value.should.be.a.directory().and.contain.deep.contents(params.expected);
						expect(params.value).to.be.a.directory().and.deep.content.contains.members(params.expected);
					}
					else if (params.contains) {
						expect(params.value).to.be.a.directory().and.contain.contents(params.expected);
						params.value.should.be.a.directory().and.contain.contents(params.expected);
						params.value.should.be.a.directory().and.content.contains.members(params.expected);
					}
					else if (params.deep) {
						expect(params.value).to.be.a.directory().with.deep.contents(params.expected);
						params.value.should.be.a.directory().with.deep.contents(params.expected);
						expect(params.value).to.be.a.directory().with.deep.contents.that.have.members(params.expected);
					}
					else {
						expect(params.value).to.be.a.directory().with.contents(params.expected);
						params.value.should.be.a.directory().with.contents(params.expected);
						expect(params.value).to.be.a.directory().with.contents.that.have.members(params.expected);
					}

					// Test chaining with normal array assertions
					expect(params.value).to.be.a.directory().and.content.is.an('array');
					expect(params.value).to.be.a.directory().and.contents.satisfy(function(contents) {
						return contents.every(function(item) {
							return typeof item === 'string';
						});
					});
				},
				"with message": {msg: true, call: function (params) {
					if (params.contains && params.deep) {
						expect(params.value).to.be.a.directory(params.msg).and.contain.deep.contents(params.expected, params.msg);
						params.value.should.be.a.directory(params.msg).and.contain.deep.contents(params.expected, params.msg);
					}
					else if (params.contains) {
						expect(params.value).to.be.a.directory(params.msg).and.contain.contents(params.expected, params.msg);
						params.value.should.be.a.directory(params.msg).and.contain.contents(params.expected, params.msg);
					}
					else if (params.deep) {
						expect(params.value).to.be.a.directory(params.msg).with.deep.contents(params.expected, params.msg);
						params.value.should.be.a.directory(params.msg).with.deep.contents(params.expected, params.msg);
					}
					else {
						expect(params.value).to.be.a.directory(params.msg).with.contents(params.expected, params.msg);
						params.value.should.be.a.directory(params.msg).with.contents(params.expected, params.msg);
					}
				}},
			},
			negate: {
				"basic": function (params) {
					if (params.contains && params.deep) {
						expect(params.value).to.be.a.directory().and.not.contain.deep.contents(params.expected);
						params.value.should.be.a.directory().and.not.contain.deep.contents(params.expected);
					}
					else if (params.contains) {
						expect(params.value).to.be.a.directory().and.not.contain.contents(params.expected);
						params.value.should.be.a.directory().and.not.contain.contents(params.expected);
					}
					else if (params.deep) {
						expect(params.value).to.be.a.directory().and.not.have.deep.contents(params.expected);
						params.value.should.be.a.directory().and.not.have.deep.contents(params.expected);
					}
					else {
						expect(params.value).to.be.a.directory().and.not.have.contents(params.expected);
						params.value.should.be.a.directory().and.not.have.contents(params.expected);
					}

					// Test chaining with normal array assertions
					params.value.should.be.a.directory().and.contents.is.not.a('string');
					params.value.should.be.a.directory().and.deep.contents.not.have.lengthOf(999);
					params.value.should.be.a.directory().and.contents.not.contain('does-not-exist.txt');
					params.value.should.be.a.directory().and.contents.not.satisfy(function(contents) {
						return contents.indexOf('does-not-exist.txt') >= 0;
					});
				},
				"with message": {msg: true, call: function (params) {
					if (params.contains && params.deep) {
						expect(params.value).to.be.a.directory(params.msg).and.not.contain.deep.contents(params.expected, params.msg);
						params.value.should.be.a.directory(params.msg).and.not.contain.deep.contents(params.expected, params.msg);
					}
					else if (params.contains) {
						expect(params.value).to.be.a.directory(params.msg).and.not.contain.contents(params.expected, params.msg);
						params.value.should.be.a.directory(params.msg).and.not.contain.contents(params.expected, params.msg);
					}
					else if (params.deep) {
						expect(params.value).to.be.a.directory(params.msg).and.not.have.deep.contents(params.expected, params.msg);
						params.value.should.be.a.directory(params.msg).and.not.have.deep.contents(params.expected, params.msg);
					}
					else {
						expect(params.value).to.be.a.directory(params.msg).and.not.have.contents(params.expected, params.msg);
						params.value.should.be.a.directory(params.msg).and.not.have.contents(params.expected, params.msg);
					}
				}}
			}
		},
		assert: {
			base: {
				"basic": function (params) {
					if (params.contains && params.deep) {
						assert.directoryDeepInclude(params.value, params.expected);
					}
					else if (params.contains) {
						assert.directoryInclude(params.value, params.expected);
					}
					else if (params.deep) {
						assert.directoryDeepContent(params.value, params.expected);
					}
					else {
						assert.directoryContent(params.value, params.expected);
					}
				},
				"with message": {msg: true, call: function (params) {
					if (params.contains && params.deep) {
						assert.directoryDeepInclude(params.value, params.expected, params.msg);
					}
					else if (params.contains) {
						assert.directoryInclude(params.value, params.expected, params.msg);
					}
					else if (params.deep) {
						assert.directoryDeepContent(params.value, params.expected, params.msg);
					}
					else {
						assert.directoryContent(params.value, params.expected, params.msg);
					}
				}}
			},
			negate: {
				"basic": function (params) {
					if (params.contains && params.deep) {
						assert.notDirectoryDeepInclude(params.value, params.expected);
					}
					else if (params.contains) {
						assert.notDirectoryInclude(params.value, params.expected);
					}
					else if (params.deep) {
						assert.notDirectoryDeepContent(params.value, params.expected);
					}
					else {
						assert.notDirectoryContent(params.value, params.expected);
					}
				},
				"with message": {msg: true, call: function (params) {
					if (params.contains && params.deep) {
						assert.notDirectoryDeepInclude(params.value, params.expected, params.msg);
					}
					else if (params.contains) {
						assert.notDirectoryInclude(params.value, params.expected, params.msg);
					}
					else if (params.deep) {
						assert.notDirectoryDeepContent(params.value, params.expected, params.msg);
					}
					else {
						assert.notDirectoryContent(params.value, params.expected, params.msg);
					}
				}}
			}
		}
	};

	var SHALLOW_CONTENTS = fs.readdirSync('test/fixtures');
	var DEEP_CONTENTS = SHALLOW_CONTENTS.slice();
	DEEP_CONTENTS.splice(DEEP_CONTENTS.indexOf('dir'), 0,
		'dir/beta.txt',
		'dir/.dotdir',
		'dir/.dotdir/.dotfile',
		'dir/.dotdir/empty'
	);
	DEEP_CONTENTS.splice(DEEP_CONTENTS.indexOf('dir-copy'), 0,
		'dir-copy/beta.txt',
		'dir-copy/.dotdir',
		'dir-copy/.dotdir/.dotfile',
		'dir-copy/.dotdir/empty'
	);

	var test = chai.getStyleTest(styles, {msg: 'My Message', chain: true});

	test.valid({
		label: 'shallow',
		value: 'test/fixtures',
		expected: SHALLOW_CONTENTS,
		length: SHALLOW_CONTENTS.length,
		report: "expected '<%= value %>' to not have the same contents as [ Array(<%= length %>) ]"
	});
	test.valid({
		label: 'deep',
		deep: true,
		value: 'test/fixtures',
		expected: DEEP_CONTENTS,
		length: DEEP_CONTENTS.length,
		report: "expected '<%= value %>' to not have the same deep contents as [ Array(<%= length %>) ]"
	});
	test.valid({
		label: 'shallow, subset',
		contains: true,
		value: 'test/fixtures',
		expected: ['alpha.txt', 'symlink.txt', 'empty', 'dir'],
		report: "expected '<%= value %>' to not contain contents [ Array(4) ]"
	});
	test.valid({
		label: 'deep, subset',
		deep: true,
		contains: true,
		value: 'test/fixtures',
		expected: ['alpha.txt', 'symlink.txt', 'empty', 'dir/.dotdir/.dotfile', 'dir/.dotdir/empty'],
		report: "expected '<%= value %>' to not contain deep contents [ Array(5) ]"
	});

	test.invalid({
		label: 'empty',
		value: 'test/fixtures',
		expected: [],
		report: "expected '<%= value %>' to have the same contents as []"
	});
	test.invalid({
		label: 'shallow',
		value: 'test/fixtures',
		expected: ['alpha.json', 'empty'],
		report: "expected '<%= value %>' to have the same contents as [ 'alpha.json', 'empty' ]"
	});
	test.invalid({
		label: 'deep',
		deep: true,
		value: 'test/fixtures',
		expected: ['empty', 'dir/.dotdir/.dotfile'],
		report: "expected '<%= value %>' to have the same deep contents as [ 'dir/.dotdir/.dotfile', 'empty' ]"
	});
	test.invalid({
		label: 'shallow, subset',
		contains: true,
		value: 'test/fixtures',
		expected: ['empty/not-empty', 'does-not-exist.txt'],
		report: "expected '<%= value %>' to contain contents [ Array(2) ]"
	});
	test.invalid({
		label: 'deep, subset',
		deep: true,
		contains: true,
		value: 'test/fixtures',
		expected: ['dir/.dotdir/empty/not-empty', 'does-not-exist.txt'],
		report: "expected '<%= value %>' to contain deep contents [ Array(2) ]"
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