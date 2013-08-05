module.exports = function (chai, utils) {
	/* jshint -W030 */
	var Assertion = chai.Assertion;
	var flag = utils.flag;
	var assert = chai.assert;

	var fs = require('fs');
	var path = require('path');

	Assertion.addMethod('basename', function (expected, msg) {
		if (msg) {
			flag(this, 'message', msg);
		}
		var obj = this._obj;

		new chai.Assertion(obj, 'actual').is.a('string');
		new chai.Assertion(expected, 'expected').is.a('string');

		var actual = path.basename(obj);

		this.assert(
			actual === expected
			, "expected #{this} to have basename #{exp} but got #{act}"
			, "expected #{this} not to have basename #{exp} but got #{act}"
			, expected
			, actual
		);
	});
	assert.basename = function (val, exp, msg) {
		new chai.Assertion(val, msg).to.have.basename(exp);
	};
	assert.notBasename = function (val, exp, msg) {
		new chai.Assertion(val, msg).to.not.have.basename(exp);
	};

	//-------------------------------------------------------------------------------------------------------------

	Assertion.addMethod('dirname', function (expected, msg) {
		if (msg) {
			flag(this, 'message', msg);
		}
		var obj = this._obj;

		new chai.Assertion(obj, 'actual').is.a('string');
		new chai.Assertion(expected, 'expected').is.a('string');

		var actual = path.dirname(obj);

		this.assert(
			actual === expected
			, "expected #{this} to have dirname #{exp} but got #{act}"
			, "expected #{this} not to have dirname #{exp} but got #{act}"
			, expected
			, actual
		);
	});
	assert.dirname = function (val, exp, msg) {
		new chai.Assertion(val, msg).to.have.dirname(exp);
	};
	assert.notDirname = function (val, exp, msg) {
		new chai.Assertion(val, msg).to.not.have.dirname(exp);
	};

	//-------------------------------------------------------------------------------------------------------------

	Assertion.addMethod('extname', function (expected, msg) {
		if (msg) {
			flag(this, 'message', msg);
		}
		var obj = this._obj;

		new chai.Assertion(obj, 'actual').is.a('string');
		new chai.Assertion(expected, 'expected').is.a('string');

		var actual = path.extname(obj);

		this.assert(
			actual === expected
			, "expected #{this} to have extname #{exp} but got #{act}"
			, "expected #{this} not to have extname #{exp} but got #{act}"
			, expected
			, actual
		);
	});
	assert.extname = function (val, exp, msg) {
		new chai.Assertion(val, msg).to.have.extname(exp);
	};
	assert.notExtname = function (val, exp, msg) {
		new chai.Assertion(val, msg).to.not.have.extname(exp);
	};

	//-------------------------------------------------------------------------------------------------------------

	Assertion.addProperty('as', function () {
		flag(this, 'chained.as', true);

		return this;
	});

	Assertion.addProperty('fs', function () {
		flag(this, 'chained.fs', true);

		return this;
	});

	//-------------------------------------------------------------------------------------------------------------

	Assertion.addMethod('path', function (msg) {
		if (msg) {
			flag(this, 'message', msg);
		}

		var obj = this._obj;

		new chai.Assertion(obj, 'actual').is.a('string');

		var pass = fs.existsSync(obj);
		//console.log(obj);
		//console.log(pass);

		this.assert(
			pass
			, "expected #{this} to exist"
			, "expected #{this} not to exist"
		);
	});
	assert.pathExists = function (val, msg) {
		new chai.Assertion(val, msg).to.be.a.path(msg);
	};
	assert.notPathExists = function (val, msg) {
		new chai.Assertion(val, msg).to.not.be.a.path(msg);
	};
};
