describe('chai-fs', function () {

	var chai = require('chai');
	chai.Assertion.includeStack = true;
	chai.should();

	var mkdirp = require('mkdirp');
	var _ = require('underscore');

	var chai_fs = require('../index');

	chai.use(chai_fs);
	chai.use(require('chai-json-schema'));

	//var expect = chai.expect;
	var assert = chai.assert;

	// import multi tester
	require('./tester')(chai, _);

	before(function (done) {
		// create an empty dir (cannot check-in empty dirs to git)
		mkdirp('./test/fixtures/empty', function (err) {
			if (err) {
				return done(err);
			}
			done();
		});
	});

	it('exports module', function () {
		assert.isFunction(chai_fs, 'chai_fs export');
	});
});