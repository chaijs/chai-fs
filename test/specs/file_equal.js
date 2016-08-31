describe(require('path').basename(__filename), function () {

	var chai = require('chai');
	var expect = chai.expect;
	var assert = chai.assert;

	it('should leave an original equal() method unaffected', function(){
		expect('abababa').to.equal('abababa');
		expect('abababa').to.not.equal('cabadaba');
		expect(12345).to.equal(12345);
		expect(12345).to.not.equal(67890);
		expect(true).to.equal(true);
		expect(true).to.not.equal(false);
	});

	it('should leave an original deepEqual() method unaffected', function(){
		var john = {name: { first: 'John', last: 'Doe' }, birthdate: new Date('1980-05-15')};
		var john2 = {name: { first: 'John', last: 'Doe' }, birthdate: new Date('1980-05-15')};
		var jane = {name: { first: 'Jane', last: 'Doe' }, birthdate: new Date('1982-11-25')};

		expect(john).to.equal(john);
		expect(john).to.not.equal(john2);
		expect(john).to.deep.equal(john2);
		expect(john).to.not.deep.equal(jane);
	});

	var styles = {
		"expect/should": {
			base: {
				"basic": function (params) {
					if (params.deep) {
						expect(params.value).to.be.a.file().and.deep.equal(params.expected);
						params.value.should.be.a.file().and.deep.equal(params.expected);
					}
					else {
						expect(params.value).to.be.a.file().and.equal(params.expected);
						params.value.should.be.a.file().and.equal(params.expected);
					}
				},
				"with message": {msg: true, call: function (params) {
					if (params.deep) {
						expect(params.value).to.be.a.file(params.msg).and.deep.equal(params.expected, params.msg);
						params.value.should.be.a.file(params.msg).and.deep.equal(params.expected, params.msg);
					}
					else {
						expect(params.value).to.be.a.file(params.msg).and.equal(params.expected, params.msg);
						params.value.should.be.a.file(params.msg).and.equal(params.expected, params.msg);
					}
				}}
			},
			negate: {
				"basic": function (params) {
					if (params.deep) {
						expect(params.value).to.be.a.file().and.not.deep.equal(params.expected);
						params.value.should.be.a.file().and.not.deep.equal(params.expected);
					}
					else {
						expect(params.value).to.be.a.file().and.not.equal(params.expected);
						params.value.should.be.a.file().and.not.equal(params.expected);
					}
				},
				"with message": {msg: true, call: function (params) {
					if (params.deep) {
						expect(params.value).to.be.a.file(params.msg).and.not.deep.equal(params.expected, params.msg);
						params.value.should.be.a.file(params.msg).and.not.deep.equal(params.expected, params.msg);
					}
					else {
						expect(params.value).to.be.a.file(params.msg).and.not.equal(params.expected, params.msg);
						params.value.should.be.a.file(params.msg).and.not.equal(params.expected, params.msg);
					}
				}}
			}
		},
		assert: {
			base: {
				"basic": function (params) {
					if (params.deep) {
						assert.fileDeepEqual(params.value, params.expected);
					}
					else {
						assert.fileEqual(params.value, params.expected);
					}
				},
				"with message": {msg: true, call: function (params) {
					if (params.deep) {
						assert.fileDeepEqual(params.value, params.expected, params.msg);
					}
					else {
						assert.fileEqual(params.value, params.expected, params.msg);
					}
				}}
			},
			negate: {
				"basic": function (params) {
					if (params.deep) {
						assert.notFileDeepEqual(params.value, params.expected);
					}
					else {
						assert.notFileEqual(params.value, params.expected);
					}
				},
				"with message": {msg: true, call: function (params) {
					if (params.deep) {
						assert.notFileDeepEqual(params.value, params.expected, params.msg);
					}
					else {
						assert.notFileEqual(params.value, params.expected, params.msg);
					}
				}}
			}
		}
	};

	var test = chai.getStyleTest(styles, {msg: 'My Message'});

	test.valid({
		label: 'same file',
		value: 'test/fixtures/alpha.txt',
		expected: 'test/fixtures/alpha.txt',
		report: "expected '<%= value %>' not to equal '<%= expected %>'"
	});
	test.valid({
		label: 'same file - deep',
		deep: true,
		value: 'test/fixtures/alpha.txt',
		expected: 'test/fixtures/alpha.txt',
		report: "expected '<%= value %>' not to deep equal '<%= expected %>'"
	});

	test.invalid({
		label: 'different files',
		value: 'test/fixtures/alpha.txt',
		expected: 'test/fixtures/tango.txt',
		report: "expected '<%= value %>' to equal '<%= expected %>'"
	});
	test.invalid({
		label: 'different files - deep',
		deep: true,
		value: 'test/fixtures/alpha.txt',
		expected: 'test/fixtures/tango.txt',
		report: "expected '<%= value %>' to deep equal '<%= expected %>'"
	});

	test.valid({
		label: 'different files, same contents',
		value: 'test/fixtures/alpha.txt',
		expected: 'test/fixtures/alpha-copy.txt',
		report: "expected '<%= value %>' not to equal '<%= expected %>'"
	});
	test.invalid({
		label: 'different files, same contents - deep',
		deep: true,
		value: 'test/fixtures/alpha.txt',
		expected: 'test/fixtures/alpha-copy.txt',
		report: "expected '<%= value %>' to deep equal '<%= expected %>' (last-modified times are different)"
	});

	test.valid({
		label: 'empty file',
		value: 'test/fixtures/empty.txt',
		expected: 'test/fixtures/empty.txt',
		report: "expected '<%= value %>' not to equal '<%= expected %>'"
	});
	test.valid({
		label: 'empty file - deep',
		deep: true,
		value: 'test/fixtures/empty.txt',
		expected: 'test/fixtures/empty.txt',
		report: "expected '<%= value %>' not to deep equal '<%= expected %>'"
	});

	test.error({
		label: 'not a file',
		value: 'test/fixtures/dir',
		report: "expected '<%= value %>' to be a file"
	});
	test.error({
		label: 'not a file - deep',
		deep: true,
		value: 'test/fixtures/dir',
		report: "expected '<%= value %>' to be a file"
	});

	test.error({
		label: 'non-existing path',
		value: 'test/fixtures/non-existing.txt',
		report: "value: expected '<%= value %>' to exist"
	});
	test.error({
		label: 'non-existing path - deep',
		deep: true,
		value: 'test/fixtures/non-existing.txt',
		report: "value: expected '<%= value %>' to exist"
	});

	test.error({
		label: 'bad expected type',
		value: 'test/fixtures/alpha.txt',
		expected: 123,
		report: "expected-value: expected <%= expected %> to be a string"
	});
	test.error({
		label: 'bad expected type - deep',
		deep: true,
		value: 'test/fixtures/alpha.txt',
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
