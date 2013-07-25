module.exports = function (chai, utils) {
	var Assertion = chai.Assertion;
	var flag = utils.flag;
	var assert = chai.assert;

	//var fs = require('fs');
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
};
