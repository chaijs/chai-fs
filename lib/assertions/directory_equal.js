module.exports = function (chai, utils) {

	var Assertion = chai.Assertion;
	var flag = utils.flag;
	var assert = chai.assert;

	var readdir = require('readdir-enhanced');
	var format = require('util').format;

	//-------------------------------------------------------------------------------------------------------------

	Assertion.overwriteMethod('equal', function (_super) {
		return function dirEqual (expected, msg) {
			if (flag(this, 'fs.isDirectory')) {
				var deep = flag(this, 'deep') ? 'deep ' : '';

				var obj = this._obj;
				var preMsg = '';
				if (msg) {
					flag(this, 'message', msg);
					preMsg = msg + ': ';
				}

				new chai.Assertion(expected, preMsg + 'expected-value').is.a('string');
				new chai.Assertion(expected, preMsg + 'expected-value').to.be.a.path();
				new chai.Assertion(expected, preMsg + 'expected-value').to.be.a.directory();

				var actualContents = readdir.sync(obj, {deep: !!deep, sep: '/'}).sort();
				var expectedContents = readdir.sync(expected, {deep: !!deep, sep: '/'}).sort();

				var pass;
				try {
					new chai.Assertion(actualContents, msg).has.same.members(expectedContents, msg);
					pass = true;
				}
				catch (e) {
					pass = false;
				}

				this.assert(
					pass
					, format("expected #{this} to %sequal '%s'", deep, expected)
					, format("expected #{this} not to %sequal '%s'", deep, expected)
					, expectedContents
					, actualContents
					, true 	// show diff
				);
			} else {
				_super.apply(this, arguments);
			}
		};
	});

	assert.directoryEqual = function (val, exp, msg) {
		new chai.Assertion(val).to.be.a.directory(msg).and.equal(exp, msg);
	};

	assert.notDirectoryEqual = function (val, exp, msg) {
		new chai.Assertion(val).to.be.a.directory(msg).and.not.equal(exp, msg);
	};

	assert.directoryDeepEqual = function (val, exp, msg) {
		new chai.Assertion(val).to.be.a.directory(msg).and.deep.equal(exp, msg);
	};

	assert.notDirectoryDeepEqual = function (val, exp, msg) {
		new chai.Assertion(val).to.be.a.directory(msg).and.not.deep.equal(exp, msg);
	};
};
