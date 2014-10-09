describe(require('path').basename(__filename), function () {

	var chai = require('chai');
	var expect = chai.expect;
	var assert = chai.assert;

	var styles = {
		"expect/should": {
			base: {
				"basic": function (params) {
					expect(params.value).to.be.a.symlink();
					params.value.should.be.a.symlink();
				},
				"with message": {msg: true, call: function (params) {
					expect(params.value).to.be.a.symlink(params.msg);
					params.value.should.be.a.symlink(params.msg);
				}}
			},
			negate: function (params) {
				expect(params.value).to.not.be.a.symlink();
				params.value.should.not.be.a.symlink();

			}
		},
		assert: {
			base: {
				"basic": function (params) {
					assert.isSymlink(params.value);
				},
				"with message": {msg: true, call: function (params) {
					assert.isSymlink(params.value, params.msg);
				}}
			},
			negate: {
				"basic": function (params) {
					assert.notIsSymlink(params.value);
				},
				"with message": {msg: true, call: function (params) {
					assert.notIsSymlink(params.value, params.msg);
				}}
			}
		}
	};

	var defaults = {
		msg: 'My Message'
	};

	var test = chai.getStyleTest(styles, defaults);

	test.valid({
		value: 'test/fixtures/symlink.txt',
		report: "expected '<%= value %>' not to be a symlink"
	});
	test.valid({
		value: 'test/fixtures/broken-symlink.txt',
		report: "expected '<%= value %>' not to be a symlink"
	});
	test.invalid({
		label: 'regular file',
		value: 'test/fixtures/alpha.txt',
		report: "expected '<%= value %>' to be a symlink"
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
