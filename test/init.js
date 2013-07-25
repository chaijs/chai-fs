describe('chai-fs', function () {

	var chai = require('chai');
	chai.Assertion.includeStack = true;

	var chai_fs = require('../index');

	chai.use(require('../index'));
	chai.should();

	var assert = chai.assert;
	var mkdirp = require('mkdirp');

	chai.use(function (chai, utils) {
		var inspect = utils.objDisplay;

		chai.Assertion.addMethod('fail', function (message) {
			var obj = this._obj;

			new chai.Assertion(obj).is.a('function');

			try {
				obj();
			}
			catch (err) {
				this.assert(
					err instanceof chai.AssertionError
					, 'expected #{this} to fail, but it threw ' + inspect(err)
					, 'expected #{this} to not fail, but it threw ' + inspect(err)
				);
				this.assert(
					err.message === message
					, 'failed correctly, but expected message #{act} to equal #{exp}'
					, 'failed correctly, but expected message #{act} to not equal #{exp}'
					, message
					, err.message
				);
				return;
			}
			this.assert(false, 'expected #{this} to fail');
		});
	});

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