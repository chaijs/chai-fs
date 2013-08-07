describe.skip(require('path').basename(__filename), function () {

	var chai = require('chai');
	var expect = chai.expect;
	var assert = chai.assert;

	var fs = require('fs');

	var styles = {
		"expect/should": {
			base: {
				"basic": function (params) {
					expect(params.value).to.be.writable();
					params.value.should.be.writable();
				},
				"with message": {msg: true, call: function (params) {
					expect(params.value).to.be.writable(params.msg);
					params.value.should.be.writable(params.msg);
				}}
			},
			negate: function (params) {
				expect(params.value).to.not.be.writable();
				params.value.should.not.be.writable();

			}
		},
		assert: {
			base: {
				"basic": function (params) {
					assert.pathWritable(params.value);
				},
				"with message": {msg: true, call: function (params) {
					assert.pathWritable(params.value, params.msg);
				}}
			},
			negate: {
				"basic": function (params) {
					assert.notPathWritable(params.value);
				},
				"with message": {msg: true, call: function (params) {
					assert.notPathWritable(params.value, params.msg);
				}}
			}
		}
	};

	var defaults = {
		msg: 'My Message'
	};

	var test = chai.getStyleTest(styles, defaults);

	var BitMask = require('bit-mask');

	var accessible = 'test/tmp/writable.txt';
	var notAccessible = 'test/tmp/not_writable.txt';

	var xnixTest = (process.platform === 'linux' || process.platform === 'darwin');

	before(function () {
		var mask;
		/*
				mask = new BitMask.OwnershipMask(777);
				console.log(mask.value.toString(8));

				mask = new BitMask.OwnershipMask(fs.statSync(accessible).mode);
				console.log(fs.statSync(accessible).mode);
				console.log(fs.statSync(accessible).mode.toString(8));
				console.log(mask.value.toString(8));
		*/

		fs.writeFileSync(accessible, 'Hello!');
		fs.writeFileSync(notAccessible, 'Hello!');

		if (xnixTest) {

			mask = new BitMask.OwnershipMask(fs.statSync(accessible).mode);
			mask.setPermission('user', 'write', true);
			fs.chmodSync(accessible, mask.value);


			mask = new BitMask.OwnershipMask(fs.statSync(notAccessible).mode);
			mask.setPermission('user', 'write', false);
			mask.setPermission('group', 'write', false);
			mask.setPermission('world', 'write', false);
			fs.chmodSync(notAccessible, mask.value);
		}
	});

	after(function () {
		var mask;

		if (xnixTest) {
			mask = new BitMask.OwnershipMask(fs.statSync(notAccessible).mode);
			mask.setPermission('user', 'write', true);
			fs.chmodSync(notAccessible, mask.value);
		}

		fs.unlinkSync(accessible);
		fs.unlinkSync(notAccessible);
	});

	test.valid({
		value: accessible,
		report: "expected '<%= value %>' not to be writable"
	});

	if (xnixTest) {
		test.invalid({
			value: notAccessible,
			report: "expected '<%= value %>' to be writable"
		});
	}
	else {
		it.skip('no platform specific test for: ' + process.platform, function () {

		});
	}

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
